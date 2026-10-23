import type { MetadataRoute } from "next";
const LANDING_URL = (process.env.NEXT_PUBLIC_LANDING_URL || "https://hwe.dkpsolution.tech").replace(/\/+$/, "");

// U8 : pages publiques de la landing.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${LANDING_URL}/`, changeFrequency: "daily", priority: 1 },
    { url: `${LANDING_URL}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${LANDING_URL}/cgu`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${LANDING_URL}/confidentialite`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
