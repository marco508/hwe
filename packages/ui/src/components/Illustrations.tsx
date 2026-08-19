import * as React from "react";

/**
 * Illustrations de marque — SVG dessinés maison, palette émeraude/terracotta.
 * Aucune dépendance, aucune image externe : légères, nettes à toute taille,
 * et lisibles en clair comme en sombre (opacités plutôt que blancs durs).
 */

const BRAND = "#149463";
const BRAND_DARK = "#0b6143";
const BRAND_LIGHT = "#7fd4b0";
const ACCENT = "#d15e2a";
const ACCENT_LIGHT = "#e17942";
const CREAM = "#f6efe3";

type IlloProps = { className?: string };

/** Skyline chaleureuse — hero de la landing et têtes de page. */
export function IlloSkyline({ className = "" }: IlloProps) {
  return (
    <svg viewBox="0 0 560 360" fill="none" className={className} aria-hidden="true">
      {/* soleil */}
      <circle cx="450" cy="80" r="42" fill={ACCENT_LIGHT} opacity="0.9" />
      <circle cx="450" cy="80" r="58" fill={ACCENT_LIGHT} opacity="0.18" />
      {/* collines */}
      <path d="M0 300 Q140 240 280 290 T560 285 V360 H0 Z" fill={BRAND} opacity="0.16" />
      <path d="M0 320 Q180 270 340 315 T560 310 V360 H0 Z" fill={BRAND} opacity="0.25" />
      {/* immeuble gauche */}
      <rect x="70" y="140" width="86" height="170" rx="8" fill={BRAND_DARK} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1].map((c) => (
          <rect
            key={`a${r}${c}`}
            x={86 + c * 34}
            y={158 + r * 36}
            width="20"
            height="22"
            rx="3"
            fill={CREAM}
            opacity={r === 1 && c === 1 ? 1 : 0.55}
          />
        )),
      )}
      {/* maison centrale */}
      <path d="M210 210 L285 150 L360 210 V310 H210 Z" fill={BRAND} />
      <path d="M196 214 L285 142 L374 214" stroke={ACCENT} strokeWidth="12" strokeLinecap="round" fill="none" />
      <rect x="262" y="248" width="46" height="62" rx="4" fill={CREAM} />
      <rect x="226" y="232" width="26" height="26" rx="4" fill={CREAM} opacity="0.75" />
      <rect x="318" y="232" width="26" height="26" rx="4" fill={CREAM} opacity="0.75" />
      {/* tour droite */}
      <rect x="396" y="170" width="76" height="140" rx="8" fill={BRAND} opacity="0.85" />
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => (
          <rect
            key={`b${r}${c}`}
            x={410 + c * 32}
            y={186 + r * 38}
            width="18"
            height="22"
            rx="3"
            fill={CREAM}
            opacity="0.6"
          />
        )),
      )}
      {/* palmier */}
      <path d="M508 310 C505 270 502 250 506 228" stroke={BRAND_DARK} strokeWidth="7" strokeLinecap="round" />
      <path d="M506 228 C488 220 474 224 462 236 M506 228 C510 210 522 202 538 202 M506 228 C524 222 538 228 546 240 M506 228 C492 212 478 208 464 212" stroke={BRAND} strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* sol */}
      <path d="M40 310 H520" stroke={BRAND_DARK} strokeWidth="5" strokeLinecap="round" opacity="0.5" />
      {/* clef flottante */}
      <g transform="rotate(-18 130 92)">
        <circle cx="118" cy="92" r="16" stroke={ACCENT} strokeWidth="7" fill="none" />
        <path d="M132 92 H172 M158 92 V106 M170 92 V102" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/** Remise de clés — pages d'authentification. */
export function IlloKeys({ className = "" }: IlloProps) {
  return (
    <svg viewBox="0 0 240 140" fill="none" className={className} aria-hidden="true">
      <circle cx="120" cy="70" r="58" fill={BRAND} opacity="0.10" />
      <path d="M64 96 L120 52 L176 96 V118 H64 Z" fill={BRAND} opacity="0.9" />
      <path d="M54 100 L120 46 L186 100" stroke={ACCENT} strokeWidth="9" strokeLinecap="round" fill="none" />
      <rect x="106" y="88" width="28" height="30" rx="3" fill={CREAM} />
      <g transform="rotate(-14 190 44)">
        <circle cx="182" cy="44" r="11" stroke={ACCENT_LIGHT} strokeWidth="5.5" fill="none" />
        <path d="M192 44 H220 M210 44 V54 M219 44 V51" stroke={ACCENT_LIGHT} strokeWidth="5.5" strokeLinecap="round" />
      </g>
      <circle cx="46" cy="42" r="4" fill={BRAND_LIGHT} />
      <circle cx="206" cy="112" r="4" fill={BRAND_LIGHT} />
      <circle cx="30" cy="86" r="3" fill={ACCENT_LIGHT} opacity="0.7" />
    </svg>
  );
}

/** Recherche de logement — états vides côté annonces. */
export function IlloSearchHome({ className = "" }: IlloProps) {
  return (
    <svg viewBox="0 0 220 150" fill="none" className={className} aria-hidden="true">
      <circle cx="96" cy="72" r="52" stroke={BRAND} strokeWidth="9" fill="none" opacity="0.9" />
      <path d="M134 112 L172 148" stroke={BRAND} strokeWidth="12" strokeLinecap="round" />
      <path d="M68 78 L96 56 L124 78 V100 H68 Z" fill={ACCENT} opacity="0.9" />
      <rect x="88" y="84" width="16" height="16" rx="2" fill={CREAM} />
      <circle cx="188" cy="36" r="5" fill={BRAND_LIGHT} />
      <circle cx="24" cy="30" r="4" fill={ACCENT_LIGHT} opacity="0.8" />
      <circle cx="30" cy="126" r="3" fill={BRAND_LIGHT} />
    </svg>
  );
}

/** Calendrier de visite — pages visites. */
export function IlloVisit({ className = "" }: IlloProps) {
  return (
    <svg viewBox="0 0 220 150" fill="none" className={className} aria-hidden="true">
      <rect x="40" y="30" width="140" height="104" rx="12" fill={BRAND} opacity="0.12" />
      <rect x="40" y="30" width="140" height="30" rx="12" fill={BRAND} />
      <rect x="40" y="48" width="140" height="12" fill={BRAND} />
      <path d="M66 22 V42 M154 22 V42" stroke={BRAND_DARK} strokeWidth="8" strokeLinecap="round" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}${c}`}
            x={58 + c * 28}
            y={72 + r * 20}
            width="16"
            height="12"
            rx="3"
            fill={BRAND}
            opacity="0.3"
          />
        )),
      )}
      <circle cx="142" cy="98" r="14" fill={ACCENT} />
      <path d="M136 98 L140 103 L149 92" stroke={CREAM} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** Dossier & documents — profil, candidatures. */
export function IlloDossier({ className = "" }: IlloProps) {
  return (
    <svg viewBox="0 0 220 150" fill="none" className={className} aria-hidden="true">
      <path d="M40 46 H92 L106 62 H180 V122 A8 8 0 0 1 172 130 H48 A8 8 0 0 1 40 122 Z" fill={BRAND} opacity="0.9" />
      <rect x="58" y="30" width="88" height="70" rx="6" fill={CREAM} stroke={BRAND_DARK} strokeWidth="3" />
      <path d="M70 48 H134 M70 62 H134 M70 76 H112" stroke={BRAND} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
      <circle cx="166" cy="52" r="18" fill={ACCENT} />
      <path d="M158 52 L163 58 L175 45" stroke={CREAM} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** Contrat signé — baux, avenants. */
export function IlloContract({ className = "" }: IlloProps) {
  return (
    <svg viewBox="0 0 220 150" fill="none" className={className} aria-hidden="true">
      <rect x="64" y="18" width="92" height="114" rx="8" fill={CREAM} stroke={BRAND_DARK} strokeWidth="3.5" />
      <path d="M80 40 H140 M80 56 H140 M80 72 H124 M80 88 H140" stroke={BRAND} strokeWidth="5" strokeLinecap="round" opacity="0.6" />
      <path d="M80 110 C92 100 96 116 108 106" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" fill="none" />
      <g transform="rotate(24 160 108)">
        <rect x="150" y="72" width="14" height="52" rx="4" fill={ACCENT_LIGHT} />
        <path d="M150 124 L157 138 L164 124 Z" fill={BRAND_DARK} />
      </g>
      <circle cx="48" cy="44" r="4" fill={BRAND_LIGHT} />
      <circle cx="178" cy="34" r="4" fill={ACCENT_LIGHT} opacity="0.8" />
    </svg>
  );
}

/** Gestion sereine — dashboard propriétaire. */
export function IlloManage({ className = "" }: IlloProps) {
  return (
    <svg viewBox="0 0 260 160" fill="none" className={className} aria-hidden="true">
      <rect x="24" y="34" width="130" height="106" rx="12" fill={BRAND} opacity="0.12" />
      <rect x="40" y="52" width="98" height="14" rx="7" fill={BRAND} opacity="0.55" />
      <rect x="40" y="76" width="72" height="14" rx="7" fill={BRAND} opacity="0.35" />
      <rect x="40" y="100" width="84" height="14" rx="7" fill={ACCENT} opacity="0.55" />
      {/* maison posée sur le tableau */}
      <path d="M162 92 L208 56 L254 92 V140 H162 Z" fill={BRAND} />
      <path d="M152 96 L208 50 L264 96" stroke={ACCENT} strokeWidth="9" strokeLinecap="round" fill="none" />
      <rect x="196" y="112" width="26" height="28" rx="3" fill={CREAM} />
      <circle cx="236" cy="30" r="5" fill={ACCENT_LIGHT} opacity="0.85" />
      <circle cx="150" cy="22" r="4" fill={BRAND_LIGHT} />
    </svg>
  );
}
