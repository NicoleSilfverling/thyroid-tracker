import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SymptomsList() {
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    const fetchSymptoms = async () => {
      const token = await AsyncStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.get(
        `http://localhost:8080/api/v1/user/symptoms/`,
        {
          params: {
            date: "2023-05-17",
          },
          config,
        }
      );
      setSymptoms(result.data);
    };
    fetchSymptoms();
  }, []);

  return (
    <View style={styles.container}>
      {symptoms.length > 0 ? (
        <FlatList
          data={symptoms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>
                Date: {item.date}, Symptom: {item.symptomType}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.text}>No symptoms found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default SymptomsList;
