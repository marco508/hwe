import type { MetadataRoute } from "next";
const LANDING_URL = (process.env.NEXT_PUBLIC_LANDING_URL || "https://hwe.dkpsolution.tech").replace(/\/+$/, "");

// U8 : indexation autorisée, sitemap déclaré.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${LANDING_URL}/sitemap.xml`,
  };
}
