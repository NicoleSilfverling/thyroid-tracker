import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import Theme from "../assets/Theme";
import { NavContext } from "../contexts/NavContext";

const NavigationBar = ({ navigation }) => {
  const { activeIcon, setActiveIcon } = useContext(NavContext);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.iconButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setActiveIcon("home"), navigation.navigate("Home");
            }}
          >
            {activeIcon === "home" ? (
              <Image
                style={styles.iconActive}
                source={require("../images/icons/homeFilled.png")}
              />
            ) : (
              <Image
                style={styles.icon}
                source={require("../images/icons/home.png")}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.txt}>Home</Text>
        </View>

        <View style={styles.iconButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setActiveIcon("calendar"), navigation.navigate("Calendar");
            }}
          >
            {activeIcon === "calendar" ? (
              <Image
                style={styles.iconActive}
                source={require("../images/icons/calendarFilled.png")}
              />
            ) : (
              <Image
                style={styles.icon}
                source={require("../images/icons/calendar.png")}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.txt}>Calendar</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.plusBtn,
            activeIcon === "saveData" ? styles.plusActive : null,
          ]}
          onPress={() => {
            setActiveIcon("saveData"), navigation.navigate("SaveData");
          }}
        >
          <Text
            style={[
              styles.plus,
              activeIcon === "saveData" ? styles.plusActive : null,
            ]}
          >
            +
          </Text>
        </TouchableOpacity>

        <View style={styles.iconButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setActiveIcon("graph"), navigation.navigate("Graph");
            }}
          >
            {activeIcon === "graph" ? (
              <Image
                style={styles.iconActive}
                source={require("../images/icons/chartFilled.png")}
              />
            ) : (
              <Image
                style={styles.icon}
                source={require("../images/icons/chart.png")}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.txt}>Charts</Text>
        </View>

        <View style={styles.iconButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              setActiveIcon("meds"), navigation.navigate("Meds");
            }}
          >
            {activeIcon === "meds" ? (
              <Image
                style={styles.iconActive}
                source={require("../images/icons/capsulesFilled.png")}
              />
            ) : (
              <Image
                style={styles.icon}
                source={require("../images/icons/capsules.png")}
              />
            )}
          </TouchableOpacity>
          <Text style={styles.txt}>Medicin</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    // height: 70,
    justifyContent: "flex-start",
    position: "absolute",
    bottom: -35,
    paddingBottom: 35,
  },
  navbar: {
    backgroundColor: "#fff",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    // position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
  },
  iconButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  txt: {
    fontSize: 14,
    color: "gray",
    marginTop: 3,
  },
  plus: {
    fontSize: 40,
    color: Theme.colors.primary,
  },
  plusBtn: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 50,
    borderColor: Theme.colors.primary,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  plusActive: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.primary,
    color: "#fff",
  },
  icon: {
    tintColor: "gray",
  },
  iconActive: {
    tintColor: Theme.colors.primary,
  },
});

export default NavigationBar;
