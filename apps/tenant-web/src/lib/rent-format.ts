import { t } from "./i18n";

/** « payable le 1er du mois » / « payable on day 5 of the month » (U4 : pas de « er » en anglais). */
export function payDayText(day: number) {
  return day === 1 ? t("fix.rent.payDay1") : t("fix.rent.payDayN", { n: day });
}
