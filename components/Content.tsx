import { View, Text, SafeAreaView } from "react-native";
import React from "react";

const Content = ({ children }: any) => {
  return <SafeAreaView className="px-5 flex-1 py-3">{children}</SafeAreaView>;
};

export default Content;
