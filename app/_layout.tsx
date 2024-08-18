import React, { useEffect } from "react";
import {
  DefaultTheme,
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { WeeksProvider } from "@/ctx/WeeksContext";
import { ThemeToggleProvider, useThemeToggle } from "@/ctx/ThemeToggleContext";

export default function RootLayout() {
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeToggleProvider>
      <AppContent />
    </ThemeToggleProvider>
  );
}

function AppContent() {
  const { theme } = useThemeToggle(); // Używamy motywu z kontekstu

  // Mapowanie stringów na obiekty Theme
  const navigationTheme = theme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={navigationTheme}>
      <WeeksProvider>
        <StatusBar
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
        />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="options"
            options={{ headerTitle: "Ustawienia" }}
          />
          <Stack.Screen name="initial" options={{ headerShown: false }} />
        </Stack>
      </WeeksProvider>
    </ThemeProvider>
  );
}
