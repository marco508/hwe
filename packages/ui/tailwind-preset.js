/** Shared Tailwind preset used by all hwe frontends to enforce the same DA. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-background, #faf7f2)",
        surface: "var(--color-surface, #ffffff)",
        border: "var(--color-border, #ece6db)",
        ink: {
          DEFAULT: "var(--color-ink, #14201A)",
          muted: "var(--color-ink-muted, #5d6660)",
          subtle: "var(--color-ink-subtle, #97a09b)",
        },
        cream: {
          50: "#fcfaf6",
          100: "#faf7f2",
          200: "#f3ede0",
          300: "#e9dfca",
          400: "#dccfb0",
        },
        sand: {
          50: "#f7f2e8",
          100: "#ede4cf",
          200: "#dcc9a3",
          300: "#caac76",
          400: "#b89251",
          500: "#9a7a3f",
        },
        brand: {
          50: "#f1f5f3",
          100: "#dde8e1",
          200: "#bbd1c4",
          300: "#8eb6a0",
          400: "#5f9879",
          500: "#3f7d5d",
          600: "#2f6249",
          700: "#264e3b",
          800: "#1f3e30",
          900: "#192f25",
          950: "#0e1e16",
        },
        accent: {
          50: "#fbf3e7",
          100: "#f5e3c8",
          200: "#ecc890",
          300: "#dfac5e",
          400: "#d1953f",
          500: "#c2884a",
          600: "#a3713a",
          700: "#85592c",
        },
        ocean: {
          50: "#eef6fb",
          100: "#d1e6f3",
          200: "#9fcde7",
          300: "#65aed4",
          400: "#3791bc",
          500: "#1f7aa6",
          600: "#185f86",
          700: "#13496a",
        },
        plum: {
          400: "#a16ec9",
          500: "#8a4cb0",
          600: "#6e3a8e",
        },
        danger: "#b3261e",
        success: "#2e7d4f",
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
        card: "0 1px 2px rgba(20,32,26,0.04), 0 4px 16px rgba(20,32,26,0.05)",
        "card-hover":
          "0 6px 16px rgba(47,98,73,0.10), 0 28px 56px -16px rgba(47,98,73,0.22)",
        focus: "0 0 0 3px rgba(63,125,93,0.25)",
        glow: "0 0 32px rgba(95,152,121,0.45)",
        "glow-accent": "0 0 32px rgba(194,136,74,0.45)",
        elevated:
          "0 32px 64px -24px rgba(20,32,26,0.28), 0 12px 24px -12px rgba(20,32,26,0.18)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(at 18% 22%, rgba(143,182,160,0.55) 0px, transparent 50%), radial-gradient(at 82% 18%, rgba(223,172,94,0.45) 0px, transparent 50%), radial-gradient(at 50% 90%, rgba(101,174,212,0.35) 0px, transparent 55%)",
        "mesh-dark":
          "radial-gradient(at 18% 22%, rgba(47,98,73,0.55) 0px, transparent 55%), radial-gradient(at 82% 18%, rgba(133,89,44,0.40) 0px, transparent 55%), radial-gradient(at 50% 95%, rgba(31,122,166,0.30) 0px, transparent 55%)",
        "warm-fade":
          "linear-gradient(180deg, #faf7f2 0%, #f3ede0 100%)",
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
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(95,152,121,0.55)" },
          "50%": { boxShadow: "0 0 0 18px rgba(95,152,121,0)" },
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
