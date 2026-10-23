#!/bin/sh
# Démarrage API : migrations VERSIONNÉES (fini le `db push --accept-data-loss`
# qui pouvait supprimer des colonnes de données en production).
#
# Cas gérés :
#  - base vierge                → migrate deploy applique tout (0_init + suite) ;
#  - base existante (pré-migrations, créée par db push) → on marque 0_init
#    comme déjà appliquée (baseline) puis migrate deploy applique la suite ;
#  - base déjà migrée           → migrate deploy applique les nouveautés ;
#  - base pas encore joignable  → nouvelle tentative, au plus MIGRATE_MAX_ATTEMPTS fois ;
#  - migration en échec (P3009/P3018) → arrêt immédiat avec un message clair
#    (réessayer en boucle ne réparera rien et masquerait l'erreur).
set -u

MAX_ATTEMPTS="${MIGRATE_MAX_ATTEMPTS:-40}"
DELAY="${MIGRATE_RETRY_DELAY:-3}"
LOG=/tmp/migrate.log
attempt=1
baselined=0

echo "⏳ Attente de la base + application des migrations…"
while :; do
  if pnpm exec prisma migrate deploy >"$LOG" 2>&1; then
    cat "$LOG"
    break
  fi

  if grep -q "P3005" "$LOG" && [ "$baselined" -eq 0 ]; then
    # P3005 : la base n'est pas vide mais n'a pas d'historique de migrations
    # → baseline sur 0_init (le schéma initial correspond à l'existant).
    echo "🔧 Base existante sans historique → baseline 0_init"
    if ! pnpm exec prisma migrate resolve --applied 0_init; then
      echo "❌ Échec du baseline 0_init : intervention manuelle requise."
      exit 1
    fi
    baselined=1
    continue
  fi

  if grep -qE "P3009|P3018" "$LOG"; then
    cat "$LOG"
    echo "❌ Une migration a échoué (P3009/P3018) : la base est dans un état intermédiaire."
    echo "   Corrigez la cause, puis marquez la migration avec"
    echo "   'prisma migrate resolve --rolled-back <nom>' (ou --applied) avant de redémarrer."
    exit 1
  fi

  cat "$LOG"
  if [ "$attempt" -ge "$MAX_ATTEMPTS" ]; then
    echo "❌ Migrations impossibles après $MAX_ATTEMPTS tentatives (base injoignable ?) : arrêt."
    exit 1
  fi
  echo "…nouvelle tentative dans ${DELAY} s ($attempt/$MAX_ATTEMPTS)"
  attempt=$((attempt + 1))
  sleep "$DELAY"
done

echo "✅ Migrations à jour."
exec node dist/src/main.js
