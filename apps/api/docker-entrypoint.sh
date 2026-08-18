#!/bin/sh
# Démarrage API : migrations VERSIONNÉES (fini le `db push --accept-data-loss`
# qui pouvait supprimer des colonnes de données en production).
#
# Cas gérés :
#  - base vierge                → migrate deploy applique tout (0_init + suite) ;
#  - base existante (pré-migrations, créée par db push) → on marque 0_init
#    comme déjà appliquée (baseline) puis migrate deploy applique la suite ;
#  - base déjà migrée           → migrate deploy applique les nouveautés.
set -e

echo "⏳ Attente de la base + application des migrations…"
until pnpm exec prisma migrate deploy 2>/tmp/migrate.log; do
  if grep -q "P3005" /tmp/migrate.log; then
    # P3005 : la base n'est pas vide mais n'a pas d'historique de migrations
    # → baseline sur 0_init (le schéma initial correspond à l'existant).
    echo "🔧 Base existante sans historique → baseline 0_init"
    pnpm exec prisma migrate resolve --applied 0_init
  else
    cat /tmp/migrate.log
    echo "…nouvelle tentative dans 3 s"
    sleep 3
  fi
done

echo "✅ Migrations à jour."
exec node dist/src/main.js
