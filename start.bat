@echo off
setlocal EnableDelayedExpansion

REM ---------------------------------------------------------------------------
REM hwe - one-click launcher (Windows)
REM Builds and starts: postgres + api + landing + owner-web + tenant-web
REM
REM Override ports if needed (before running) :
REM   set HWE_API_PORT=4001
REM   set HWE_LANDING_PORT=3010
REM   set HWE_OWNER_PORT=3011
REM   set HWE_TENANT_PORT=3012
REM ---------------------------------------------------------------------------

cd /d "%~dp0"

if "%HWE_API_PORT%"=="" set HWE_API_PORT=4005
if "%HWE_LANDING_PORT%"=="" set HWE_LANDING_PORT=3006
if "%HWE_OWNER_PORT%"=="" set HWE_OWNER_PORT=3005
if "%HWE_TENANT_PORT%"=="" set HWE_TENANT_PORT=3004

echo.
echo ============================================
echo   hwe - demarrage de la plateforme
echo ============================================
echo   API      -^> port %HWE_API_PORT%
echo   Landing  -^> port %HWE_LANDING_PORT%
echo   Owner    -^> port %HWE_OWNER_PORT%
echo   Tenant   -^> port %HWE_TENANT_PORT%
echo ============================================
echo.

REM --- Check Docker ----------------------------------------------------------
where docker >nul 2>nul
if errorlevel 1 (
    echo [ERREUR] Docker n'est pas installe ou pas dans le PATH.
    echo Installez Docker Desktop : https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

docker info >nul 2>nul
if errorlevel 1 (
    echo [ERREUR] Le daemon Docker ne tourne pas.
    echo Lancez Docker Desktop et reessayez.
    pause
    exit /b 1
)

REM --- Detect docker compose v1 vs v2 ---------------------------------------
set "COMPOSE=docker compose"
docker compose version >nul 2>nul
if errorlevel 1 (
    set "COMPOSE=docker-compose"
)

REM --- Cleanup any previous run (frees the ports) ---------------------------
echo [1/5] Nettoyage des conteneurs precedents...
%COMPOSE% down --remove-orphans >nul 2>nul

REM --- Check ports are free -------------------------------------------------
echo [2/5] Verification des ports...
call :check_port %HWE_API_PORT% API
if errorlevel 1 goto port_busy
call :check_port %HWE_LANDING_PORT% Landing
if errorlevel 1 goto port_busy
call :check_port %HWE_OWNER_PORT% Owner
if errorlevel 1 goto port_busy
call :check_port %HWE_TENANT_PORT% Tenant
if errorlevel 1 goto port_busy
goto ports_ok

:port_busy
echo.
echo [ERREUR] Un port est deja occupe par un autre processus.
echo.
echo Pour identifier qui l'utilise :
echo   netstat -ano ^| findstr :^<port^>
echo Pour le tuer :
echo   taskkill /PID ^<PID^> /F
echo.
echo Ou changez les ports avant de relancer, par exemple :
echo   set HWE_LANDING_PORT=3010
echo   set HWE_OWNER_PORT=3011
echo   set HWE_TENANT_PORT=3012
echo   start.bat
echo.
pause
exit /b 1

:ports_ok

REM --- Build -----------------------------------------------------------------
echo [3/5] Construction des images (peut prendre quelques minutes la 1ere fois)...
%COMPOSE% build
if errorlevel 1 (
    echo [ERREUR] Build Docker echoue.
    pause
    exit /b 1
)

echo.
echo [4/5] Demarrage des services...
%COMPOSE% up -d
if errorlevel 1 (
    echo [ERREUR] Demarrage Docker echoue.
    echo Logs : %COMPOSE% logs
    pause
    exit /b 1
)

echo.
echo [5/5] Attente de l'API (jusqu'a 60s)...
set /a tries=0
:wait_api
set /a tries+=1
powershell -NoProfile -Command "try { (Invoke-WebRequest -UseBasicParsing -Uri 'http://localhost:%HWE_API_PORT%/api/properties' -TimeoutSec 2).StatusCode } catch { exit 1 }" >nul 2>nul
if not errorlevel 1 goto api_up
if %tries% GEQ 30 goto api_timeout
timeout /t 2 /nobreak >nul
goto wait_api

:api_timeout
echo [AVERTISSEMENT] L'API ne repond pas encore. Verifiez : %COMPOSE% logs -f api
goto show_urls

:api_up
echo OK : API en ligne.

:show_urls
echo.
echo ============================================
echo   hwe est lance
echo ============================================
echo   API            http://localhost:%HWE_API_PORT%/api
echo   Vitrine        http://localhost:%HWE_LANDING_PORT%
echo   Espace owner   http://localhost:%HWE_OWNER_PORT%
echo   Espace tenant  http://localhost:%HWE_TENANT_PORT%
echo ============================================
echo.
echo Compte administrateur (cree au seed) :
echo   admin@hwe.local / ChangeMe!2026
echo   (surchargez via ADMIN_EMAIL / ADMIN_PASSWORD avant le seed)
echo.
echo Commandes utiles :
echo   Creer le compte admin :        %COMPOSE% exec api pnpm prisma:seed
echo   Voir les logs :                %COMPOSE% logs -f
echo   Arreter :                      %COMPOSE% down
echo   Tout reset (donnees incluses): %COMPOSE% down -v
echo.
echo La plateforme demarre avec un catalogue VIDE.
echo Connectez-vous a l'espace proprietaire pour publier vos biens.
echo.

REM --- Optional admin seed ---------------------------------------------------
choice /c YN /m "Voulez-vous creer le compte administrateur maintenant"
if errorlevel 2 goto end
goto do_seed

:do_seed
echo Seed en cours...
%COMPOSE% exec api pnpm prisma:seed
goto end

:end
endlocal
pause
exit /b 0

REM ---------------------------------------------------------------------------
REM :check_port <port> <label>
REM Utilise PowerShell pour eviter les problemes de parsing cmd/powershell
REM Renvoie errorlevel 1 si le port est occupe
REM ---------------------------------------------------------------------------
:check_port
set "PORT=%~1"
set "LABEL=%~2"
powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort %PORT% -State Listen -ErrorAction SilentlyContinue) { exit 1 } else { exit 0 }" >nul 2>nul
if errorlevel 1 (
    echo   [BUSY] Port %PORT% ^(%LABEL%^) deja utilise
    exit /b 1
)
echo   [OK]   Port %PORT% ^(%LABEL%^) libre
exit /b 0
