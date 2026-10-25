#!/bin/sh
# Copie la banque de photos (source : apps/landing/public/images) vers les
# espaces propriétaire et locataire. Chaque app sert ses images depuis son
# propre public/ : aucune dépendance entre apps ni vers un CDN à l'exécution.
# Les Dockerfiles copient apps/<app> en entier (public/ compris).
set -e
cd "$(dirname "$0")/.."
SRC=apps/landing/public/images
sync() { # app dossiers...
  app=$1; shift
  rm -rf "apps/$app/public/images"; mkdir -p "apps/$app/public/images"
  for d in "$@"; do cp -r "$SRC/$d" "apps/$app/public/images/"; done
  cp "$SRC/CREDITS.md" "apps/$app/public/images/"
}
sync tenant-web types cities auth voyage
sync owner-web types auth
echo "images synchronisées"
