import { get, writable } from "svelte/store";

export type Theme = "light" | "dark";

function createThemeStore() {
  const stored =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;
  const prefersDark =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;

  const initialTheme: Theme =
    (stored as Theme) || (prefersDark ? "dark" : "light");

  const { subscribe, set } = writable<Theme>(initialTheme);

  if (typeof window !== "undefined") {
    applyTheme(initialTheme);
  }

  return {
    subscribe,
    toggle: () => {
      // 1. Grab the current value cleanly without subscriptions
      const currentTheme = get({ subscribe });
      const newTheme = currentTheme === "light" ? "dark" : "light";

      // 2. Update the store and side effects
      set(newTheme);
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
      }
    },
    set: (theme: Theme) => {
      set(theme);
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", theme);
        applyTheme(theme);
      }
    },
  };
}

function applyTheme(theme: Theme) {
  if (typeof document !== "undefined") {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
}

export const themeStore = createThemeStore();
