import React from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import Graph from "../components/Graph";
import NavigationBar from "../components/NavigationBar";

export default function GraphScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Graph />
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
  },
});
