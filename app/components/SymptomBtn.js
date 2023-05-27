import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Theme from "../assets/Theme";

export default function SymptomBtn({
  value,
  label,
  onPress,
  group,
  fetchedData,
}) {
  const handlePress = () => {
    onPress(value);
  };

  let color = "";

  switch (group) {
    case 1:
      color = Theme.colors.red;
      break;
    case 2:
      color = Theme.colors.primary;
      break;
    default:
      color = Theme.colors.blue;
      break;
  }

  const hasMatchingType = fetchedData.some((symptom) => symptom.type === label);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { borderColor: color },
        hasMatchingType && { backgroundColor: color },
      ]}
      onPress={handlePress}
    >
      <Text
        style={[
          styles.buttonText,
          { color: color },
          hasMatchingType && { color: "white" },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 95,
    height: 95,
    borderWidth: 3,
    borderRadius: 100,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "700",
  },
});
