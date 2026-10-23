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

// ─── Illustrations d'états vides ─────────────────────────────────────────────

export type EmptyIllo =
  | "home"
  | "inbox"
  | "calendar"
  | "wallet"
  | "chat"
  | "tools"
  | "heart"
  | "search"
  | "document"
  | "key";

/** Décor commun : halo, ombre portée, petites touches de couleur. */
function EmptyFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 200 150" fill="none" className={className} aria-hidden="true">
      <circle cx="100" cy="72" r="62" fill={BRAND} opacity="0.09" />
      <ellipse cx="100" cy="136" rx="62" ry="7" fill={BRAND_DARK} opacity="0.12" />
      {children}
      <circle cx="30" cy="34" r="4" fill={ACCENT_LIGHT} opacity="0.8" />
      <circle cx="176" cy="28" r="3.5" fill={BRAND_LIGHT} />
      <circle cx="170" cy="112" r="3" fill={BRAND_LIGHT} opacity="0.9" />
      <path d="M22 96h8M26 92v8" stroke={BRAND_LIGHT} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const House = ({ x = 100, y = 132, s = 1 }: { x?: number; y?: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-44 0 V-46 L0 -80 L44 -46 V0 Z" fill={BRAND} />
    <path d="M-54 -40 L0 -86 L54 -40" stroke={ACCENT} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <rect x="-12" y="-34" width="24" height="34" rx="3" fill={CREAM} />
    <rect x="-34" y="-40" width="16" height="16" rx="3" fill={CREAM} opacity="0.8" />
    <rect x="18" y="-40" width="16" height="16" rx="3" fill={CREAM} opacity="0.8" />
  </g>
);

export function IlloEmpty({ kind, className = "" }: { kind: EmptyIllo; className?: string }) {
  switch (kind) {
    case "home":
      return (
        <EmptyFrame className={className}>
          <House />
          <path d="M150 132 C150 118 152 108 158 98" stroke={BRAND_DARK} strokeWidth="4" strokeLinecap="round" />
          <path d="M158 98 C150 92 142 94 138 102 M158 98 C164 90 172 90 178 96 M156 110 C164 104 172 106 176 112" stroke={BRAND} strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="146" cy="40" r="15" fill={ACCENT} />
          <path d="M146 33v14M139 40h14" stroke={CREAM} strokeWidth="3.5" strokeLinecap="round" />
        </EmptyFrame>
      );
    case "inbox":
      return (
        <EmptyFrame className={className}>
          <rect x="64" y="22" width="72" height="62" rx="6" fill={CREAM} stroke={BRAND} strokeOpacity="0.35" strokeWidth="2" />
          <path d="M76 38h48M76 50h48M76 62h30" stroke={BRAND} strokeWidth="4" strokeLinecap="round" opacity="0.45" />
          <path d="M46 70 L100 104 L154 70 V128 a4 4 0 0 1-4 4 H50 a4 4 0 0 1-4-4 Z" fill={BRAND} />
          <path d="M46 128 L88 96 M154 128 L112 96" stroke={BRAND_DARK} strokeWidth="3" opacity="0.6" />
          <circle cx="150" cy="58" r="12" fill={ACCENT} />
          <path d="M150 52v7M150 63v.5" stroke={CREAM} strokeWidth="3" strokeLinecap="round" />
        </EmptyFrame>
      );
    case "calendar":
      return (
        <EmptyFrame className={className}>
          <rect x="44" y="34" width="112" height="96" rx="12" fill={CREAM} stroke={BRAND} strokeOpacity="0.3" strokeWidth="2" />
          <path d="M44 46 a12 12 0 0 1 12-12 h88 a12 12 0 0 1 12 12 V62 H44 Z" fill={BRAND} />
          <path d="M70 24 V44 M130 24 V44" stroke={BRAND_DARK} strokeWidth="8" strokeLinecap="round" />
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <rect key={`${r}${c}`} x={58 + c * 23} y={72 + r * 18} width="14" height="10" rx="3" fill={BRAND} opacity={r === 1 && c === 2 ? 0 : 0.25} />
            )),
          )}
          <circle cx="111" cy="95" r="13" fill={ACCENT} />
          <path d="M105 95 L109 100 L118 90" stroke={CREAM} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </EmptyFrame>
      );
    case "wallet":
      return (
        <EmptyFrame className={className}>
          <rect x="60" y="20" width="62" height="80" rx="5" fill={CREAM} stroke={BRAND} strokeOpacity="0.3" strokeWidth="2" transform="rotate(-8 91 60)" />
          <path d="M70 38h34M70 50h40M70 62h26" stroke={BRAND} strokeWidth="4" strokeLinecap="round" opacity="0.4" transform="rotate(-8 91 60)" />
          <rect x="40" y="64" width="104" height="66" rx="12" fill={BRAND} />
          <rect x="112" y="84" width="40" height="26" rx="8" fill={BRAND_DARK} />
          <circle cx="126" cy="97" r="5" fill={ACCENT_LIGHT} />
          <ellipse cx="160" cy="128" rx="16" ry="5" fill={ACCENT} />
          <rect x="144" y="114" width="32" height="14" fill={ACCENT} />
          <ellipse cx="160" cy="114" rx="16" ry="5" fill={ACCENT_LIGHT} />
        </EmptyFrame>
      );
    case "chat":
      return (
        <EmptyFrame className={className}>
          <path d="M40 40 a12 12 0 0 1 12-12 h66 a12 12 0 0 1 12 12 v34 a12 12 0 0 1-12 12 H72 l-18 16 v-16 h-2 a12 12 0 0 1-12-12 Z" fill={BRAND} />
          <path d="M58 50h56M58 64h38" stroke={CREAM} strokeWidth="5" strokeLinecap="round" opacity="0.85" />
          <path d="M84 84 a10 10 0 0 1 10-10 h62 a10 10 0 0 1 10 10 v26 a10 10 0 0 1-10 10 h-4 v14 l-16-14 H94 a10 10 0 0 1-10-10 Z" fill={ACCENT} />
          <circle cx="108" cy="98" r="4" fill={CREAM} />
          <circle cx="124" cy="98" r="4" fill={CREAM} />
          <circle cx="140" cy="98" r="4" fill={CREAM} />
        </EmptyFrame>
      );
    case "tools":
      return (
        <EmptyFrame className={className}>
          <House x={88} s={0.82} />
          <g transform="rotate(40 146 70)">
            <rect x="140" y="52" width="12" height="70" rx="6" fill={ACCENT} />
            <path d="M134 40 a14 14 0 1 0 24 0 l-6 8 h-12 Z" fill={ACCENT} />
          </g>
          <circle cx="154" cy="40" r="5" fill={BRAND_LIGHT} />
        </EmptyFrame>
      );
    case "heart":
      return (
        <EmptyFrame className={className}>
          <House x={96} s={0.9} />
          <path d="M150 58 c8-8 20-4 20 7 0 10-20 22-20 22 s-20-12-20-22 c0-11 12-15 20-7Z" fill={ACCENT} />
        </EmptyFrame>
      );
    case "search":
      return (
        <EmptyFrame className={className}>
          <circle cx="90" cy="68" r="42" fill={CREAM} stroke={BRAND} strokeWidth="9" />
          <path d="M120 100 L152 130" stroke={BRAND} strokeWidth="13" strokeLinecap="round" />
          <path d="M66 76 L90 56 L114 76 V94 H66 Z" fill={ACCENT} />
          <rect x="83" y="80" width="14" height="14" rx="2" fill={CREAM} />
        </EmptyFrame>
      );
    case "document":
      return (
        <EmptyFrame className={className}>
          <path d="M58 18 h58 l26 26 v86 a6 6 0 0 1-6 6 H58 a6 6 0 0 1-6-6 V24 a6 6 0 0 1 6-6 Z" fill={CREAM} stroke={BRAND} strokeOpacity="0.35" strokeWidth="2" />
          <path d="M116 18 v20 a6 6 0 0 0 6 6 h20" fill={BRAND} opacity="0.25" />
          <path d="M68 58h52M68 72h60M68 86h40" stroke={BRAND} strokeWidth="4.5" strokeLinecap="round" opacity="0.45" />
          <path d="M68 112 c8-10 12-2 18-6 s8-8 14 0" stroke={BRAND_DARK} strokeWidth="3" strokeLinecap="round" fill="none" />
          <g transform="rotate(35 150 92)">
            <rect x="145" y="52" width="11" height="58" rx="3" fill={ACCENT} />
            <path d="M145 110 l5.5 12 5.5-12 Z" fill={BRAND_DARK} />
          </g>
        </EmptyFrame>
      );
    case "key":
    default:
      return (
        <EmptyFrame className={className}>
          <House x={86} s={0.85} />
          <g transform="rotate(-20 150 54)">
            <circle cx="138" cy="54" r="13" stroke={ACCENT} strokeWidth="7" fill="none" />
            <path d="M151 54 H184 M172 54 V66 M182 54 V63" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" />
          </g>
        </EmptyFrame>
      );
  }
}
