import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Theme from "../assets/Theme";

export default SymptomBtn = ({
  value,
  label,
  selected,
  onPress,
  colorGroup,
}) => {
  const handlePress = () => {
    onPress(value);
  };

  let color = "";

  switch (colorGroup) {
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

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { borderColor: color },
        selected && { backgroundColor: color },
      ]}
      onPress={handlePress}
    >
      <Text
        style={[
          styles.buttonText,
          { color: color },
          selected && { color: "white" },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "700",
  },
});
