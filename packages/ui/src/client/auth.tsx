"use client";

import * as React from "react";
import type { Role, User } from "@hwe/types";
import { commonApi } from "./common-api";
import { ApiError, isApiError } from "./errors";
import { AUTH_EVENTS, tokenStore } from "./http";
import { getUiLang, LANG_EVENTS, requestLang } from "../components/I18nKit";
import { isLang } from "@hwe/types";

/**
 * Contexte d'authentification partagé (Q1, A1, F4, F5, F6).
 *
 * - Le rôle est vérifié AVANT d'enregistrer le jeton (F4) : un compte d'un
 *   autre rôle n'est jamais « à moitié connecté ».
 * - `/auth/me` en échec : seul un 401 déconnecte ; réseau/429/5xx gardent le
 *   jeton, exposent `sessionError` et réessaient automatiquement (A1).
 * - Après login/register, l'utilisateur est rechargé via /auth/me pour avoir
 *   `emailVerifiedAt` et `avatarUrl` (F5, F6).
 * - Un 403 EMAIL_NOT_VERIFIED reçu n'importe où marque l'e-mail comme non
 *   vérifié → l'encart de vérification s'affiche.
 * - Langue : à la connexion, User.locale l'emporte (sinon la langue courante
 *   y est enregistrée) ; un changement de langue d'un utilisateur connecté
 *   est enregistré dans User.locale (e-mails et PDF dans sa langue).
 */

export type AuthCtx = {
  user: User | null;
  /** Vrai tant que la session n'est pas établie (y compris pendant une panne réseau). */
  loading: boolean;
  /** Panne temporaire pendant la restauration de session (jeton conservé). */
  sessionError: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (input: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
    /** Inscription pro (owner-web) : rôle AGENT, agence, invitation d'agent. */
    role?: "OWNER" | "AGENT";
    agencyName?: string;
    agencyInviteToken?: string;
  }) => Promise<User>;
  /** Ouvre la session à partir d'une réponse { accessToken, user } (activation d'un compte invité). */
  adopt: (accessToken: string, user: User) => Promise<User>;
  logout: () => void;
  refresh: () => Promise<void>;
  /** Fusionne des champs dans l'utilisateur courant (après PATCH /users/me…). */
  patchUser: (patch: Partial<User>) => void;
  /** E-mail confirmé ? (false si inconnu → on considère non vérifié). */
  emailVerified: boolean;
};

/** Code d'erreur levé par login/register quand le rôle ne convient pas à l'app. */
export const WRONG_ROLE = "WRONG_ROLE";

// Un seul contexte par app (une app = un AuthProvider) : les composants
// partagés de @hwe/ui (encart de vérification, messagerie…) peuvent le lire.
const Ctx = React.createContext<AuthCtx | null>(null);

/** Contexte d'authentification courant (lève hors AuthProvider). */
export function useAuth(): AuthCtx {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/** Variante tolérante : null hors AuthProvider (landing). */
export function useOptionalAuth(): AuthCtx | null {
  return React.useContext(Ctx);
}

export function createAuth(options: {
  /** Rôles autorisés à ouvrir une session dans cette app. */
  allowedRoles: Role[];
  /** Rôle créé par l'inscription de cette app. */
  registerRole: "OWNER" | "TENANT";
}) {
  function roleOk(u: User | null | undefined) {
    return !!u && options.allowedRoles.includes(u.role);
  }

  function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [sessionError, setSessionError] = React.useState(false);
    const retryRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const attemptRef = React.useRef(0);

    const refresh = React.useCallback(async () => {
      if (retryRef.current) clearTimeout(retryRef.current);
      if (!tokenStore.get()) {
        setUser(null);
        setSessionError(false);
        setLoading(false);
        return;
      }
      try {
        const me = await commonApi.me();
        if (!roleOk(me)) {
          // Jeton d'un autre espace (ex. locataire sur owner-web) : on l'oublie.
          tokenStore.clear();
          setUser(null);
        } else {
          setUser(me);
        }
        attemptRef.current = 0;
        setSessionError(false);
        setLoading(false);
      } catch (e) {
        if (isApiError(e) && e.status === 401) {
          tokenStore.clear();
          setUser(null);
          setSessionError(false);
          setLoading(false);
          return;
        }
        // Panne temporaire : on garde le jeton et on réessaie (3 s → 30 s max).
        setSessionError(true);
        const delay = Math.min(30_000, 3000 * 2 ** attemptRef.current++);
        retryRef.current = setTimeout(() => void refresh(), delay);
      }
    }, []);

    React.useEffect(() => {
      void refresh();
      return () => {
        if (retryRef.current) clearTimeout(retryRef.current);
      };
    }, [refresh]);

    // Événements émis par request() : 401 global, e-mail non vérifié.
    React.useEffect(() => {
      const onUnauthorized = () => setUser(null);
      const onNotVerified = () =>
        setUser((u) => (u && u.emailVerifiedAt ? { ...u, emailVerifiedAt: null } : u));
      window.addEventListener(AUTH_EVENTS.unauthorized, onUnauthorized);
      window.addEventListener(AUTH_EVENTS.emailNotVerified, onNotVerified);
      // Déconnexion / connexion dans un autre onglet.
      const onStorage = (e: StorageEvent) => {
        if (e.key === "hwe.token") void refresh();
      };
      window.addEventListener("storage", onStorage);
      return () => {
        window.removeEventListener(AUTH_EVENTS.unauthorized, onUnauthorized);
        window.removeEventListener(AUTH_EVENTS.emailNotVerified, onNotVerified);
        window.removeEventListener("storage", onStorage);
      };
    }, [refresh]);

    // Changement de langue par l'utilisateur connecté → User.locale.
    const userRef = React.useRef<User | null>(null);
    userRef.current = user;
    React.useEffect(() => {
      const onLang = (e: Event) => {
        const l = (e as CustomEvent<{ lang?: string }>).detail?.lang;
        const u = userRef.current;
        if (!u || !isLang(l) || u.locale === l || !tokenStore.get()) return;
        commonApi
          .updateMe({ locale: l })
          .then(() => setUser((cur) => (cur ? { ...cur, locale: l } : cur)))
          .catch(() => {
            /* best effort : le choix reste mémorisé sur l'appareil */
          });
      };
      window.addEventListener(LANG_EVENTS.changed, onLang);
      return () => window.removeEventListener(LANG_EVENTS.changed, onLang);
    }, []);

    /** À la connexion : User.locale l'emporte ; à défaut, on y enregistre la langue courante. */
    const syncLocaleOnLogin = React.useCallback((u: User) => {
      const saved = u.locale;
      if (isLang(saved)) {
        if (saved !== getUiLang()) requestLang(saved);
        return;
      }
      commonApi.updateMe({ locale: getUiLang() }).catch(() => {});
    }, []);

    const establish = React.useCallback(
      async (accessToken: string, u: User): Promise<User> => {
        if (!roleOk(u)) throw new ApiError(403, [], WRONG_ROLE);
        tokenStore.set(accessToken);
        setUser(u);
        setSessionError(false);
        setLoading(false);
        // Complète les champs éventuellement absents (emailVerifiedAt, avatarUrl).
        try {
          const me = await commonApi.me();
          setUser(me);
          return me;
        } catch {
          return u;
        }
      },
      [],
    );

    const login = React.useCallback<AuthCtx["login"]>(
      async (email, password) => {
        const r = await commonApi.login({ email: email.trim(), password });
        const u = await establish(r.accessToken, r.user);
        syncLocaleOnLogin(u);
        return u;
      },
      [establish, syncLocaleOnLogin],
    );

    const register = React.useCallback<AuthCtx["register"]>(
      async (input) => {
        const { role, ...rest } = input;
        const r = await commonApi.register({
          ...rest,
          email: input.email.trim(),
          locale: getUiLang(),
          // Seule une app qui autorise le rôle AGENT peut créer un compte pro.
          role: role && options.allowedRoles.includes(role) ? role : options.registerRole,
        });
        return establish(r.accessToken, r.user);
      },
      [establish],
    );

    const logout = React.useCallback(() => {
      tokenStore.clear();
      setUser(null);
      setSessionError(false);
    }, []);

    const patchUser = React.useCallback((patch: Partial<User>) => {
      setUser((u) => (u ? { ...u, ...patch } : u));
    }, []);

    const value = React.useMemo<AuthCtx>(
      () => ({
        user,
        loading,
        sessionError,
        login,
        register,
        adopt: establish,
        logout,
        refresh,
        patchUser,
        emailVerified: !!user?.emailVerifiedAt,
      }),
      [user, loading, sessionError, login, register, establish, logout, refresh, patchUser],
    );

    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  }

  return { AuthProvider, useAuth };
}
