-- Performance (tests de charge) : index du catalogue public.
-- La liste des annonces (accueil, recherche) filtre status = 'PUBLISHED' et
-- trie par createdAt décroissant : sans cet index, chaque page relisait et
-- triait toute la table « Property ».
-- Migration ADDITIVE et REJOUABLE : aucun index ni colonne existant modifié.
CREATE INDEX IF NOT EXISTS "Property_status_createdAt_idx" ON "Property"("status", "createdAt" DESC);
