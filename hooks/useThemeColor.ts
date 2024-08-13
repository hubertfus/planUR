// useThemeColor.ts
import { useThemeToggle } from "@/hooks/ThemeToggleContext";

type ThemeColors = {
  light: string;
  dark: string;
};

export function useThemeColor(
  colors: ThemeColors,
  colorType: "light" | "dark"
): string {
  const { theme } = useThemeToggle();
  
  // Zapewnij, że zawsze zwracany jest string
  return theme === "dark" ? colors.dark : colors.light;
}
