import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import Theme from "../assets/Theme";

export default SymptomSlider = ({
  value,
  topRef,
  bottomRef,
  onValueChange,
}) => {
  const handleValueChange = (val) => {
    onValueChange(val);
  };

  return (
    <View style={styles.container}>
      <Slider
        style={{ width: "100%", alignSelf: "center" }}
        minimumValue={1}
        maximumValue={5}
        step={1}
        value={value}
        onValueChange={handleValueChange}
        minimumTrackTintColor={Theme.colors.primary}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.text, { textAlign: "left" }]}>Low</Text>
        {/* <Text style={[styles.text, { textAlign: "center" }]}>Ok</Text> */}
        <Text style={[styles.text, { textAlign: "right" }]}>High</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    // backgroundColor: "pink",
    marginTop: 30,
    marginBottom: 30,
  },
  textContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    width: "30%",
    // backgroundColor: "red",
    textAlign: "center",
  },
});
