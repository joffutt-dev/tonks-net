import { writable } from "svelte/store";

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
      let newTheme: Theme;
      const unsubscribe = subscribe((currentTheme) => {
        newTheme = currentTheme === "light" ? "dark" : "light";
      })();
      unsubscribe();

      set(newTheme!);
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme!);
        applyTheme(newTheme!);
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
