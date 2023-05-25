import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Theme from "../assets/Theme";

const screenWidth = Dimensions.get("window").width;

export default Graph = ({ selectedOption }) => {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    fetchSymptomData();
  }, [selectedOption]);

  const fetchSymptomData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(
        `http://localhost:8080/symptoms/type/${selectedOption}`,
        { headers }
      );
      setFetchedData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching symptom data:", error);
    }
  };

  const chartData = {
    labels: fetchedData.map((d) => d.date),
    datasets: [
      {
        data: fetchedData.map((d) => d.value),
        // color: (opacity = 1) => {
        //   if (selectedPoint) {
        //     return `rgba(255, 0, 0, ${opacity})`; // red if selected
        //   }
        //   return Theme.colors.primary; // blue if not selected
        // },
        // strokeWidth: 2, // optional
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => Theme.colors.primary, // black
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: Theme.colors.primary,
    },
  };

  const [selectedPoint, setSelectedPoint] = useState(null);

  function handleDataPointClick(data) {
    const selectedIndex = data.index;
    const selectedData = fetchedData[selectedIndex];
    setSelectedPoint(selectedData.date);
  }

  return (
    <View style={styles.container}>
      {fetchedData.length > 0 ? (
        <>
          <Text style={{ textAlign: "center", padding: 10 }}>
            {selectedPoint ? `Selected value: ${selectedPoint.value}` : ""}
          </Text>
          <LineChart
            data={chartData}
            width={screenWidth}
            height={220}
            onDataPointClick={handleDataPointClick}
            chartConfig={chartConfig}
          />

          <ScrollView contentContainerStyle={styles.listContainer}>
            <View style={styles.item}>
              <Text>Date</Text>
              <Text>Value</Text>
              <Text>Ref</Text>
            </View>
            {fetchedData.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.item,
                  selectedPoint &&
                    selectedPoint === item.date && {
                      backgroundColor: "#eee",
                    },
                ]}
              >
                <Text>{item.date}</Text>
                <Text>{item.value}</Text>
                <Text>
                  {item.topRef}-{item.bottomRef}
                </Text>
              </View>
            ))}
          </ScrollView>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
  },
  listContainer: {
    paddingHorizontal: 16,
    width: "100%",
  },
});
