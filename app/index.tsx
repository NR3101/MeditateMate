import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import React from "react";

import beachImage from "@/assets/meditation-images/beach.webp";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "expo-router";
import AppGradient from "@/components/AppGradient";

const App = () => {
  const router = useRouter();

  return (
    <View className="flex-1">
      <ImageBackground
        source={beachImage}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}>
          <SafeAreaView className="flex-1 px-1 my-8 justify-between">
            <View>
              <Text className="text-center text-white font-bold text-4xl">
                MeditateMate
              </Text>
              <Text className="text-center text-white text-lg mt-3">
                Simplifying Meditation for Everyone.
              </Text>
            </View>

            <View>
              <CustomButton
                onPress={() => router.push("/nature-meditate")}
                title="Get Started"
              />
            </View>
          </SafeAreaView>
        </AppGradient>
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
};

export default App;
