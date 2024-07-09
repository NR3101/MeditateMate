import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import { useLocalSearchParams, useRouter } from "expo-router";

import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { TimerContext } from "@/contexts/TimerContext";

const Meditate = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { duration: secondsRemaining, setDuration } = useContext(TimerContext);

  // const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setAudioSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // useEffect to handle the timer countdown
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (secondsRemaining === 0) {
      setIsMeditating(false);
      return;
    }

    if (isMeditating) {
      timerId = setInterval(() => {
        setDuration((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [secondsRemaining, isMeditating]);

  // useEffect to handle the audio file loading and unloading on component unmount
  useEffect(() => {
    return () => {
      setDuration(10);
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  // Toggle the meditation session status
  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) {
      setDuration(10);
    }

    setIsMeditating((prev) => !prev);

    await toggleSound();
  };

  // Toggle the sound status --> Play or Pause
  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeAudio();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound?.playAsync();
      setIsPlayingAudio(true);
    } else {
      await sound?.pauseAsync();
      setIsPlayingAudio(false);
    }
  };

  // Initialize the audio file
  const initializeAudio = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);

    setAudioSound(sound);
    return sound;
  };

  // Format the timeLeft to 00:00 format when it is less than 10
  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  // Handle the Adjust Duration button
  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();

    router.push("(modal)/adjust-meditation-duration");
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-12 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={45} color="white" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton
              title="Adjust Duration"
              onPress={handleAdjustDuration}
            />
            <CustomButton
              title={isMeditating ? "Stop Meditation" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
              containerStyles="mt-4"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
