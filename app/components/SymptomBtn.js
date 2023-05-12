import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Theme from "../assets/Theme";

export default SymptomBtn = ({ value, label, selected, onPress }) => {
  const handlePress = () => {
    onPress(value);
  };

  return (
    <TouchableOpacity
      style={[styles.button, selected && styles.buttonSelected]}
      onPress={handlePress}
    >
      <Text style={[styles.buttonText, selected && styles.buttonTextSelected]}>
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
    borderColor: Theme.colors.red,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "700",
    color: Theme.colors.red,
  },
  buttonSelected: {
    backgroundColor: Theme.colors.red,
  },
  buttonTextSelected: {
    color: "#FFFFFF",
  },
});
