import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  SplashScreen.preventAutoHideAsync();

  useEffect(() => {
    const checkSchedule = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("schedule");
        if (jsonValue == null) router.replace("initial");
      } catch (e) {
        // error reading value
      }
    };
    checkSchedule();

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="options" options={{ headerTitle: "Ustawienia" }} />
        <Stack.Screen name="initial" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
