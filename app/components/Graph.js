import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default Graph = () => {
  const [data, setData] = useState([
    { label: "Jan", value: 20 },
    { label: "Feb", value: 45 },
    { label: "Mar", value: 28 },
    { label: "Apr", value: 80 },
    { label: "May", value: 99 },
    { label: "Jun", value: 43 },
  ]);

  const [selectedPoint, setSelectedPoint] = useState(null);

  function handleDataPointClick(data) {
    setSelectedPoint(data);
    console.log(data);
  }

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        //color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // blue
        color: (opacity = 1) => {
          if (selectedPoint) {
            // && id?
            return `rgba(255, 0, 0, ${opacity})`; // red if selected
          }
          return `rgba(0, 0, 255, ${opacity})`; // blue if not selected
        },
        strokeWidth: 2, // optional
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // black
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "blue",
    },
  };

  return (
    <View style={styles.container}>
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
        {data.map((item) => (
          <View key={item.label} style={styles.item}>
            <Text>{item.label}</Text>
            <Text>{item.value}</Text>
          </View>
        ))}
      </ScrollView>
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
