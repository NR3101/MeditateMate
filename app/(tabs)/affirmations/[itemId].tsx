import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GalleryPreviewData } from "@/constants/models/AffirmationsCategory";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import AppGradient from "@/components/AppGradient";

import { AntDesign } from "@expo/vector-icons";

const AffirmationPractice = () => {
  const { itemId } = useLocalSearchParams();
  const router = useRouter();
  const [affirmation, setAffirmation] = useState<GalleryPreviewData>();
  const [sentences, setSentences] = useState<string[]>([]);

  useEffect(() => {
    for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
      const affirmationData = AFFIRMATION_GALLERY[idx].data;

      const affirmationToStart = affirmationData.find(
        (a) => a.id === Number(itemId)
      );

      if (affirmationToStart) {
        setAffirmation(affirmationToStart);

        const affirmationArray = affirmationToStart.text.split(".");

        //Remove the last empty string
        if (affirmationArray[affirmationArray.length - 1] === "") {
          affirmationArray.pop();
        }

        setSentences(affirmationArray);

        return;
      }
    }
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={affirmation?.image}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.9)"]}>
          <Pressable
            className="absolute top-12 left-6"
            onPress={() => router.back()}
          >
            <AntDesign name="leftcircleo" size={45} color="white" />
          </Pressable>

          <ScrollView className="mt-28" showsVerticalScrollIndicator={false}>
            <View className="h-full justify-center">
              <View className="h-4/5 justify-center">
                {sentences.map((sentence, idx) => (
                  <Text
                    key={idx}
                    className="text-white text-2xl mb-12 font-bold text-center font-outfit"
                  >
                    {sentence + "."}
                  </Text>
                ))}
              </View>
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffirmationPractice;
