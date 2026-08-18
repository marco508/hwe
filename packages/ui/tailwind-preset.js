/** Shared Tailwind preset used by all hwe frontends to enforce the same DA. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Triplets RGB + <alpha-value> : sans cela, tout modificateur
        // d'opacité (bg-surface/40, dark:bg-background/85…) est ignoré
        // en silence et la classe n'est pas générée du tout.
        background: "rgb(var(--rgb-background, 251 250 247) / <alpha-value>)",
        surface: "rgb(var(--rgb-surface, 255 255 255) / <alpha-value>)",
        border: "rgb(var(--rgb-border, 232 229 221) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--rgb-ink, 16 24 21) / <alpha-value>)",
          muted: "rgb(var(--rgb-ink-muted, 87 99 93) / <alpha-value>)",
          subtle: "rgb(var(--rgb-ink-subtle, 118 128 122) / <alpha-value>)",
        },
        // Ivoire propre (moins jaune que l'ancien crème) — fond éditorial net.
        cream: {
          50: "#fdfcfa",
          100: "#faf9f5",
          200: "#f3f1e9",
          300: "#e9e4d5",
          400: "#dad2ba",
        },
        // Miel doré (remplace les tans olive/boueux).
        sand: {
          50: "#fbf6ec",
          100: "#f4ead2",
          200: "#e9d7a8",
          300: "#dcbe77",
          400: "#cba24e",
          500: "#ab8236",
        },
        // Émeraude profond — plus saturé et confiant que l'ancien vert sauge.
        brand: {
          50: "#ecfaf3",
          100: "#d3f2e2",
          200: "#a7e4c8",
          300: "#6fd0a7",
          400: "#37b483",
          500: "#149463",
          600: "#0b7a51",
          700: "#0b6143",
          800: "#0c4d37",
          900: "#0a3e2d",
          950: "#04271c",
        },
        // Terracotta cuivré — chaleureux et vivant (remplace le tan éteint).
        accent: {
          50: "#fdf2ec",
          100: "#fae0cf",
          200: "#f4c19e",
          300: "#ec9c6a",
          400: "#e17942",
          500: "#d15e2a",
          600: "#ad491f",
          700: "#89391b",
        },
        ocean: {
          50: "#eef7fb",
          100: "#d3e9f4",
          200: "#a3d2e8",
          300: "#67b4d6",
          400: "#3596c0",
          500: "#1c7dab",
          600: "#14628b",
          700: "#104b6d",
        },
        plum: {
          400: "#a16ec9",
          500: "#8a4cb0",
          600: "#6e3a8e",
        },
        danger: "#c22e20",
        success: "#15803d",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        display: ["\"Fraunces\"", "\"Cormorant Garamond\"", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      fontSize: {
        "display-sm": ["2.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-md": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-lg": ["5rem", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-xl": ["7rem", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
        "3xl": "36px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,21,0.04), 0 4px 16px rgba(16,24,21,0.05)",
        "card-hover":
          "0 6px 16px rgba(11,122,81,0.10), 0 28px 56px -16px rgba(11,122,81,0.22)",
        focus: "0 0 0 3px rgba(20,148,99,0.28)",
        glow: "0 0 32px rgba(55,180,131,0.45)",
        "glow-accent": "0 0 32px rgba(225,121,66,0.45)",
        elevated:
          "0 32px 64px -24px rgba(16,24,21,0.28), 0 12px 24px -12px rgba(16,24,21,0.18)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(at 18% 22%, rgba(111,208,167,0.50) 0px, transparent 50%), radial-gradient(at 82% 18%, rgba(236,156,106,0.40) 0px, transparent 50%), radial-gradient(at 50% 90%, rgba(103,180,214,0.32) 0px, transparent 55%)",
        "mesh-dark":
          "radial-gradient(at 18% 22%, rgba(11,97,67,0.55) 0px, transparent 55%), radial-gradient(at 82% 18%, rgba(137,57,27,0.40) 0px, transparent 55%), radial-gradient(at 50% 95%, rgba(20,98,139,0.30) 0px, transparent 55%)",
        "warm-fade":
          "linear-gradient(180deg, #faf9f5 0%, #f3f1e9 100%)",
        "shine":
          "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(40px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.9)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(55,180,131,0.55)" },
          "50%": { boxShadow: "0 0 0 18px rgba(55,180,131,0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.15) translate(-2%, -2%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        blob: "blob 18s ease-in-out infinite",
        "blob-slow": "blob 28s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "gradient-pan": "gradient-pan 12s ease infinite",
        "fade-in-up": "fade-in-up 0.7s ease-out both",
        "fade-in": "fade-in 0.6s ease-out both",
        "pulse-glow": "pulse-glow 2.2s ease-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        "ken-burns": "ken-burns 18s ease-in-out infinite alternate",
        marquee: "marquee 36s linear infinite",
        "scale-in": "scale-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
