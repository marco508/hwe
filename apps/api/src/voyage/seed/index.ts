import type { SeedCountry } from "./types";
import { BENIN_CIRCUITS, BENIN_DESTINATIONS, BENIN_GUIDE } from "./benin";
import { BENIN_I18N } from "./benin-i18n";
import { TOGO_CIRCUITS, TOGO_DESTINATIONS, TOGO_GUIDE } from "./togo";
import { TOGO_I18N } from "./togo-i18n";
import { GHANA_CIRCUITS, GHANA_DESTINATIONS, GHANA_GUIDE } from "./ghana";
import { GHANA_I18N } from "./ghana-i18n";
import { NIGERIA_CIRCUITS, NIGERIA_DESTINATIONS, NIGERIA_GUIDE } from "./nigeria";
import { NIGERIA_I18N } from "./nigeria-i18n";
import { COTE_IVOIRE_CIRCUITS, COTE_IVOIRE_DESTINATIONS, COTE_IVOIRE_GUIDE } from "./cote-ivoire";
import { COTE_IVOIRE_I18N } from "./cote-ivoire-i18n";
import { SENEGAL_CIRCUITS, SENEGAL_DESTINATIONS, SENEGAL_GUIDE } from "./senegal";
import { SENEGAL_I18N } from "./senegal-i18n";
import { BURKINA_CIRCUITS, BURKINA_DESTINATIONS, BURKINA_GUIDE } from "./burkina";
import { BURKINA_I18N } from "./burkina-i18n";
import { NIGER_CIRCUITS, NIGER_DESTINATIONS, NIGER_GUIDE } from "./niger";
import { NIGER_I18N } from "./niger-i18n";
import { MALI_CIRCUITS, MALI_DESTINATIONS, MALI_GUIDE } from "./mali";
import { MALI_I18N } from "./mali-i18n";
import { GUINEE_CIRCUITS, GUINEE_DESTINATIONS, GUINEE_GUIDE } from "./guinee";
import { GUINEE_I18N } from "./guinee-i18n";

/** Contenu de départ, dans l'ordre de VOYAGE_COUNTRIES (@hwe/types). */
export const SEED_COUNTRIES: SeedCountry[] = [
  { guide: BENIN_GUIDE, destinations: BENIN_DESTINATIONS, circuits: BENIN_CIRCUITS, i18n: BENIN_I18N },
  { guide: TOGO_GUIDE, destinations: TOGO_DESTINATIONS, circuits: TOGO_CIRCUITS, i18n: TOGO_I18N },
  { guide: GHANA_GUIDE, destinations: GHANA_DESTINATIONS, circuits: GHANA_CIRCUITS, i18n: GHANA_I18N },
  { guide: NIGERIA_GUIDE, destinations: NIGERIA_DESTINATIONS, circuits: NIGERIA_CIRCUITS, i18n: NIGERIA_I18N },
  { guide: COTE_IVOIRE_GUIDE, destinations: COTE_IVOIRE_DESTINATIONS, circuits: COTE_IVOIRE_CIRCUITS, i18n: COTE_IVOIRE_I18N },
  { guide: SENEGAL_GUIDE, destinations: SENEGAL_DESTINATIONS, circuits: SENEGAL_CIRCUITS, i18n: SENEGAL_I18N },
  { guide: BURKINA_GUIDE, destinations: BURKINA_DESTINATIONS, circuits: BURKINA_CIRCUITS, i18n: BURKINA_I18N },
  { guide: NIGER_GUIDE, destinations: NIGER_DESTINATIONS, circuits: NIGER_CIRCUITS, i18n: NIGER_I18N },
  { guide: MALI_GUIDE, destinations: MALI_DESTINATIONS, circuits: MALI_CIRCUITS, i18n: MALI_I18N },
  { guide: GUINEE_GUIDE, destinations: GUINEE_DESTINATIONS, circuits: GUINEE_CIRCUITS, i18n: GUINEE_I18N },
];

/**
 * Circuits retirés du contenu de départ : supprimés au démarrage s'ils sont
 * restés intacts (voir VoyageSeedService.refreshUntouched).
 * - nord-benin-6-jours : Pendjari et Atacora formellement déconseillés (FCDO, France Diplomatie, 2025-2026).
 */
export const RETIRED_CIRCUITS = ["nord-benin-6-jours"];
