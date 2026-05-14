/** Shared Tailwind preset used by all hwe frontends to enforce the same DA. */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-background, #fafaf7)",
        surface: "var(--color-surface, #ffffff)",
        border: "var(--color-border, #e6e4dd)",
        ink: {
          DEFAULT: "var(--color-ink, #1a1a1a)",
          muted: "var(--color-ink-muted, #6b6b6b)",
          subtle: "var(--color-ink-subtle, #9a9a9a)",
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
        },
        accent: {
          500: "#c2884a",
          600: "#a3713a",
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
        display: ["\"Fraunces\"", "Georgia", "serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
        focus: "0 0 0 3px rgba(63,125,93,0.25)",
      },
    },
  },
  plugins: [],
};
