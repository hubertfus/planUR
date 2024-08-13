import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useLayoutEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark";

interface ThemeToggleContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeToggleContext = createContext<ThemeToggleContextType | undefined>(
  undefined
);

export function ThemeToggleProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useLayoutEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem("@theme");
        if (storedTheme) {
          setTheme(storedTheme as Theme);
        }
      } catch (error) {
        console.error("Failed to load theme", error);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem("@theme", newTheme);
    } catch (error) {
      console.error("Failed to save theme", error);
    }
  };

  return (
    <ThemeToggleContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeToggleContext.Provider>
  );
}

export function useThemeToggle() {
  const context = React.useContext(ThemeToggleContext);
  if (context === undefined) {
    throw new Error("useThemeToggle must be used within a ThemeToggleProvider");
  }
  return context;
}
