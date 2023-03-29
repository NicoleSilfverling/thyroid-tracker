import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const NavigationBar = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      {/* Home */}
      <TouchableOpacity
        style={styles.navbarItem}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.navbarItemText}>Hem</Text>
      </TouchableOpacity>

      {/* Meds */}
      <TouchableOpacity
        style={styles.navbarItem}
        onPress={() => navigation.navigate("Meds")}
      >
        <Text style={styles.navbarItemText}>Meds</Text>
      </TouchableOpacity>

      {/* SaveData */}
      <TouchableOpacity
        style={[styles.navbarItem, styles.plusBtn]}
        onPress={() => navigation.navigate("SaveData")}
      >
        <Text style={styles.navbarItemText}>+</Text>
      </TouchableOpacity>

      {/* Details */}
      <TouchableOpacity
        style={styles.navbarItem}
        onPress={() => navigation.navigate("Details")}
      >
        <Text style={styles.navbarItemText}>Details</Text>
      </TouchableOpacity>

      {/* Graph */}
      <TouchableOpacity style={styles.navbarItem}>
        <Text
          style={styles.navbarItemText}
          onPress={() => navigation.navigate("Graph")}
        >
          Graph
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#fff",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navbarItemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  plusBtn: {
    // width: 50,
    // height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 50,
  },
});

export default NavigationBar;
