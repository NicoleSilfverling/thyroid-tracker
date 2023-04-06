import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import NavigationBar from "../components/NavigationBar";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.welcomebg}>
          <Text>Welcome Nicki!</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.box}></View>
          <View style={styles.box}></View>
        </View>
        <NavigationBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  welcomebg: {
    padding: 20,
    flex: 1,
  },
  card: {
    backgroundColor: "#ddd",
    flex: 3,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,

    alignItems: "center",
  },
  box: {
    backgroundColor: "white",
    width: "90%",
    height: 170,
    borderRadius: 10,
    marginTop: 80,
  },
});
