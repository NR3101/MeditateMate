import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  textStyles?: string;
  containerStyles?: string;
}

const CustomButton = ({
  onPress,
  title,
  textStyles = "",
  containerStyles = "",
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-white rounded-2xl min-h-[58px] justify-center items-center 
        ${containerStyles}`}
      onPress={onPress}
    >
      <Text className={`font-bold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
