/** @type {import('next').NextConfig} */

const { PHASE_PRODUCTION_BUILD } = require("next/constants");

// S5 : en-têtes de sécurité (anti-clickjacking, sniffing MIME, referrer).
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// Pages à identifiant servies par une COQUILLE STATIQUE pré-rendue au build
// (src/lib/route-params.ts) : plus de rendu serveur à chaque visite, et rien
// n'est mis en cache par URL (une URL inventée ne remplit aucun cache).
// Réécritures « afterFiles » : les routes statiques voisines (/dashboard/loyers…)
// restent prioritaires.
const shellRewrites = [
  { source: "/activer/:token", destination: "/activer/detail" },
  { source: "/dashboard/mandats/:id", destination: "/dashboard/mandats/detail" },
  { source: "/dashboard/:id", destination: "/dashboard/bien" },
  { source: "/dashboard/:id/documents", destination: "/dashboard/bien/documents" },
  { source: "/dashboard/:id/edit", destination: "/dashboard/bien/edit" },
  { source: "/dashboard/:id/lease", destination: "/dashboard/bien/lease" },
  { source: "/dashboard/:id/sejour", destination: "/dashboard/bien/sejour" },
  { source: "/invitation/agence/:token", destination: "/invitation/agence/detail" },
  { source: "/pro/mandats/:id", destination: "/pro/mandats/detail" },
  { source: "/properties/:id", destination: "/properties/detail" },
];

const config = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["@hwe/ui", "@hwe/types"],
  async rewrites() {
    return shellRewrites;
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

// Q5 : une image de production sans URL d'API pointerait vers un repli
// arbitraire — on fait échouer le BUILD (et seulement le build : au
// démarrage `next start`, la variable, déjà figée dans le bundle, n'est
// plus présente dans l'environnement du conteneur).
module.exports = (phase) => {
  if (phase === PHASE_PRODUCTION_BUILD && !process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL doit être défini au build (ex. https://hwe.dkpsolution.tech).");
  }
  return config;
};
