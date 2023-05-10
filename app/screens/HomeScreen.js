import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import NavigationBar from "../components/NavigationBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation, setIsLoggedIn }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    // navigation.navigate("LoginScreen");
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.welcomebg}>
          <Text>Welcome Nicki!</Text>
        </View>
        <View style={styles.card}>
          <Button title="Logout" onPress={handleLogout} />
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
