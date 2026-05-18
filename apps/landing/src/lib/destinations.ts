/**
 * @deprecated
 * Les destinations curatées (villes hardcodées + décors SVG factices) ne sont
 * plus utilisées : la landing dérive ses destinations directement des biens
 * réellement publiés en base, ville par ville, avec leurs vraies photos.
 *
 * Ce fichier est conservé vide pour ne pas casser d'éventuels imports historiques.
 * Vous pouvez le supprimer sans risque.
 */

export type DecorKey = never;
export interface DestinationDef {
  name: string;
  region: string;
  gradient: string;
  decor: DecorKey;
}
export const DESTINATIONS_BY_COUNTRY: Record<string, DestinationDef[]> = {};
