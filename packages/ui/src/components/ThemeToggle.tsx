"use client";

import * as React from "react";
import { cn } from "../utils";

/** Persists user preference in localStorage and toggles the `dark` class on <html>. */
export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ? stored === "dark" : prefersDark;
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={dark ? "Mode clair" : "Mode sombre"}
      className={cn(
        // Pill with a visible but calm background
        "inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 transition-colors",
        // Light mode: subtle green tint
        "bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200",
        // Dark mode: dim surface with lighter text so it stands out on the dark navbar
        "dark:bg-brand-900 dark:text-brand-200 dark:hover:bg-brand-800 dark:border-brand-700",
        className,
      )}
    >
      {dark ? (
        <>
          {/* Sun icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          <span className="text-xs font-medium">Clair</span>
        </>
      ) : (
        <>
          {/* Moon icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <span className="text-xs font-medium">Sombre</span>
        </>
      )}
    </button>
  );
}
