import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import Graph from "../components/Graph";
import NavigationBar from "../components/NavigationBar";
import ModalDropdown from "react-native-modal-dropdown";
import { symptomOptions } from "../constants/symptomOptions";

export default function GraphScreen({ navigation }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleDropdownSelect = (index, value) => {
    setSelectedOption(value);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.title}>Select an option:</Text>
          <ModalDropdown
            options={symptomOptions.map((option) => option.type)}
            style={styles.dropdown}
            dropdownStyle={styles.dropdownContainer}
            dropdownTextStyle={styles.dropdownText}
            onSelect={handleDropdownSelect}
            renderRow={(option, index, isSelected) => (
              <View
                style={[
                  styles.dropdownRow,
                  isSelected && styles.selectedOption,
                ]}
              >
                <Text style={styles.dropdownRowText}>{option}</Text>
              </View>
            )}
          />
          {/* <Text style={styles.selectedOption}>
            Selected option: {selectedOption ? selectedOption : "None"}
          </Text> */}
        </View>
        <Graph selectedOption={selectedOption} />
        <NavigationBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    // backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  dropdownContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdown: {
    width: 200,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 4,
  },
  dropdownContainer: {
    width: 200,
    maxHeight: 150,
  },
  dropdownText: {
    fontSize: 16,
    padding: 8,
  },
  dropdownRow: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dropdownRowText: {
    fontSize: 16,
  },
  selectedOption: {
    marginTop: 20,
  },
});
