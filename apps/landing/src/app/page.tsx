import LandingPage from "../components/LandingPage";

// Préchargement de la photo du hero (élément LCP) : mêmes srcset/sizes que
// <Photo id="hero/hero-main" priority> dans LandingPage.
const HERO_SRCSET = [640, 1280, 1920].map((w) => `/images/hero/hero-main-${w}.webp ${w}w`).join(", ");
const HERO_SIZES = "(min-width: 1280px) 560px, (min-width: 1024px) 44vw, 100vw";

export default function Page() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        type="image/webp"
        imageSrcSet={HERO_SRCSET}
        imageSizes={HERO_SIZES}
        {...({ fetchpriority: "high" } as Record<string, string>)}
      />
      <LandingPage />
    </>
  );
}
