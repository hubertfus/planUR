import { useThemeToggle } from "@/ctx/ThemeToggleContext";

type ThemeColors = {
  light: string;
  dark: string;
};

export function useThemeColor(
  colors: ThemeColors,
  colorType: "light" | "dark"
): string {
  const { theme } = useThemeToggle();
  
  return theme === "dark" ? colors.dark : colors.light;
}
