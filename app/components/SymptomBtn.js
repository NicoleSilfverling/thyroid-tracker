import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Theme from "../assets/Theme";
import symptomIcons from "../constants/symptomIcons";

export default function SymptomBtn({
  value,
  type,
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

  const hasMatchingType = fetchedData.some((symptom) => symptom.type === type);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          { borderColor: color },
          hasMatchingType && { backgroundColor: color },
        ]}
        onPress={handlePress}
      >
        {group === 2 ? (
          <Image
            source={symptomIcons(type)}
            style={[
              styles.buttonImage,
              hasMatchingType && { tintColor: "white" },
            ]}
          />
        ) : (
          <Text
            style={[
              styles.buttonText,
              { color: color },
              hasMatchingType && { color: "white" },
            ]}
          >
            {type}
          </Text>
        )}
      </TouchableOpacity>
      <Text>{type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 95,
    height: 95,
    borderWidth: 3,
    borderRadius: 100,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "700",
  },
  buttonImage: {
    tintColor: Theme.colors.primary,
    width: "55%",
    height: "55%",
  },
});
