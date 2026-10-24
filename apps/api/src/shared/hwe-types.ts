/**
 * Valeurs (pas seulement des types) partagées avec les fronts, importées par
 * chemin RELATIF : à l'exécution, Node ne connaît pas l'alias « @hwe/types »
 * (paquet en TypeScript source). tsc compile ces fichiers dans
 * dist/packages/types/… et le require relatif fonctionne tel quel.
 * Les imports de TYPES peuvent continuer à utiliser « @hwe/types ».
 */
export * from "../../../../packages/types/src/i18n";
export * from "../../../../packages/types/src/geo";
export * from "../../../../packages/types/src/currencies";
