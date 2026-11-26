"use client";

import { useLayoutEffect } from "react";

import { THEME_SCRIPT, THEME_STORAGE_KEY as STORAGE_KEY } from "@/lib/theme";

/**
 * Inline <head> script that applies the theme before first paint. It runs from the server HTML;
 * on the client it renders as text/plain so React doesn't warn about rendering a <script>.
 */
export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}

// Mirrors THEME_SCRIPT in lib/theme.ts: light by default, dark only if the visitor chose it.
function resolveTheme(): "light" | "dark" {
  try {
    if (localStorage.getItem(STORAGE_KEY) === "dark") return "dark";
  } catch {}
  return "light";
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  // React's dev-mode remount resets <html> classes; re-apply before paint. No-op in production.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", resolveTheme() === "dark");
  }, []);

  const toggle = () => {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  // Both icons render; CSS picks one, so server and client markup always match.
  return (
    <button type="button" onClick={toggle} aria-label="Toggle dark mode" title="Toggle dark mode" className={className}>
      <span className="dark:hidden">
        <MoonIcon />
      </span>
      <span className="hidden text-[#f5c08a] dark:inline">
        <SunIcon />
      </span>
    </button>
  );
}
