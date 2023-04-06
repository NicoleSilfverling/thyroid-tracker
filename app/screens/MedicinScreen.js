import React from "react";
import { View, SafeAreaView, Text } from "react-native";
import SwipingViews from "../components/SwipingViews";

export default function MedicinScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Meds</Text>
      <SwipingViews />
    </SafeAreaView>
  );
}
