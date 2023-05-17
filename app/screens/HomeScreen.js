import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import NavigationBar from "../components/NavigationBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Welcome from "../components/Welcome";
import Theme from "../assets/Theme";

export default function HomeScreen({ navigation, setIsLoggedIn }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    // navigation.navigate("LoginScreen");
    setIsLoggedIn(false);
  };

  const [isVisible, setIsVisible] = useState(false);

  const togglePopup = () => {
    setIsVisible(!isVisible);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <View style={styles.welcomebg}>
          <Welcome />
          <Image
            style={styles.profileImg}
            source={require("../images/profileIcon.png")}
          />

          <View style={styles.menu}>
            <TouchableOpacity onPress={togglePopup}>
              {/* <Text style={{ fontSize: 30 }}>=</Text> */}
              <Image
                // style={styles.burger}
                source={require("../images/menu-burger.png")}
              />
            </TouchableOpacity>

            {isVisible && (
              <View style={styles.menuPopup}>
                <Button title="Logout" onPress={handleLogout} />
              </View>
            )}
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.box}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("SaveData")}
            >
              <Text style={styles.title}>How are you today?</Text>
              <View style={styles.add}>
                <Text style={styles.addTxt}>+</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.card}></View>
          </View>
          <View style={styles.box}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("Meds")}
            >
              {/* <View> */}
              <Text style={styles.title}>Medicin</Text>
              <Image
                style={styles.pills}
                source={require("../images/pills.jpg")}
              />
            </TouchableOpacity>

            {/* <View style={styles.card}></View> */}
            <View style={styles.card}></View>
          </View>
        </View>
        <NavigationBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomebg: {
    padding: 20,
    flex: 1,
  },
  menu: {
    // borderWidth: 1,
    // borderRadius: 10,
    position: "absolute",
    right: 20,
    top: 10,
    alignItems: "flex-end",
  },
  menuPopup: {
    // borderWidth: 1,
    // borderRadius: 10,
    padding: 5,
  },
  profileImg: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  section: {
    backgroundColor: "#fff",
    flex: 3,
    // height: 400,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    borderBottomColor: "#fff",
  },
  box: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: "white",
    width: 160,
    height: 180,
    borderRadius: 10,
    margin: 20,
    padding: 20,
    alignItems: "center",
    // justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  add: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Theme.colors.primary,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  addTxt: {
    fontSize: 30,
    lineHeight: 30,
    // backgroundColor: "red",
    fontWeight: "500",
    textAlign: "center",
    color: Theme.colors.primary,
  },
  title: {
    fontSize: 25,
    color: Theme.colors.primary,
  },
  pills: {
    width: "90%",
    height: "90%",
  },
});
