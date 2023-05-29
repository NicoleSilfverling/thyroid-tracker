import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

function SymptomsList({ fetchedData, selectedDate }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved symptoms {selectedDate}</Text>
      {fetchedData.length > 0 ? (
        <View>
          <View style={styles.item}>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Type</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Value</Text>
            </View>
            {/* <View style={styles.textContainer}>
          <Text style={styles.label}>Ref</Text>
        </View> */}
          </View>
          <View style={styles.itemContainer}>
            {fetchedData.map((item) => (
              <View style={styles.item} key={item.id.toString()}>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.type}</Text>
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.value}</Text>
                </View>
                {/* <View style={styles.textContainer}>
        <Text style={styles.text}>{item.bottomRef}-{item.topRef}</Text>
      </View> */}
              </View>
            ))}
          </View>
        </View>
      ) : (
        <Text style={styles.text}>No symptoms found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    // marginTop: 60,
    alignItems: "center",
  },
  item: {
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  textContainer: {
    width: 80,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
});

export default SymptomsList;
