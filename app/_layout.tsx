import TimerProvider from "@/contexts/TimerContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";

// Prevent the splash screen from auto-hiding until the fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Mono": require("../assets/fonts/RobotoMono.ttf"),
    Outfit: require("../assets/fonts/Outfit.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;
  if (!fontsLoaded && !error) return null;

  return (
    <TimerProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="meditate/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(modal)/adjust-meditation-duration"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
      </Stack>
    </TimerProvider>
  );
}
