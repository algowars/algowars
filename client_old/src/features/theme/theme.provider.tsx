import { createContext, useContext, useEffect, useState } from "react";
import { Theme } from "./theme.model";
import { Mode } from "./mode.model";
import { themes } from "./themes";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultMode?: Mode;
  themeStorageKey?: string;
  modeStorageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  mode: Mode;
  setMode: (mode: Mode) => void;
};

const initialState: ThemeProviderState = {
  theme: themes[0],
  setTheme: () => null,
  mode: "dark",
  setMode: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = themes["zinc"],
  defaultMode = "dark",
  themeStorageKey = "vite-ui-theme",
  modeStorageKey = "vite-ui-mode",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      themes[localStorage.getItem(themeStorageKey) ?? "zinc"] || defaultTheme
  );
  const [mode, setMode] = useState<Mode>(defaultMode);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (mode === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);

      // if (theme && theme?.style?.root) {
      //   const root = document.body;

      //   if (systemTheme === "light") {
      //     Object.entries(theme.style.root).forEach(([key, value]) => {
      //       root.style.setProperty(`--${key}`, value);
      //     });
      //   } else {
      //     Object.entries(theme.style.dark).forEach(([key, value]) => {
      //       root.style.setProperty(`--${key}`, value);
      //     });
      //   }
      // }

      return;
    }

    // if (theme && theme?.style?.root) {
    //   const root = document.body;

    //   if (mode === "light") {
    //     Object.entries(theme.style.root).forEach(([key, value]) => {
    //       root.style.setProperty(`--${key}`, value);
    //     });
    //   } else {
    //     Object.entries(theme.style.dark).forEach(([key, value]) => {
    //       root.style.setProperty(`--${key}`, value);
    //     });
    //   }
    // }

    root.classList.add(mode);
  }, [mode, theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(themeStorageKey, theme.name);
      setTheme(theme);
    },
    mode,
    setMode: (mode: Mode) => {
      localStorage.setItem(modeStorageKey, mode);
      setMode(mode);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
