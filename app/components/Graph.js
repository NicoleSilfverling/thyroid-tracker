import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Theme from "../assets/Theme";
import { fetchSymptomDataByType } from "../api/api";

const screenWidth = Dimensions.get("window").width;

export default Graph = ({ selectedOption }) => {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    fetchSymptomData();
  }, [selectedOption]);

  const fetchSymptomData = async () => {
    try {
      const data = await fetchSymptomDataByType(selectedOption);
      setFetchedData(data);
      console.log(data);
    } catch (error) {
      // Error handling is already done in the API service function
    }
  };

  const chartData = {
    labels: fetchedData.map((d) => d.date),
    datasets: [
      {
        data: fetchedData.map((d) => d.value),
        minBarLength: 0,
        // color: (opacity = 1) => {
        //   if (selectedPoint) {
        //     return `rgba(255, 0, 0, ${opacity})`; // red if selected
        //   }
        //   return Theme.colors.primary; // blue if not selected
        // },
        // strokeWidth: 2, // optional
      },
      {
        data: [0], //lowest value
        withDots: false,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => Theme.colors.primary,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
          {/* <Text style={{ textAlign: "center", padding: 10 }}>
            {selectedPoint ? `Selected value: ${selectedPoint.value}` : ""}
          </Text> */}
          <LineChart
            data={chartData}
            width={screenWidth}
            height={220}
            onDataPointClick={handleDataPointClick}
            chartConfig={chartConfig}
          />

          <ScrollView style={styles.listContainer}>
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
                  {item.bottomRef}-{item.topRef}
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
    // backgroundColor: "blue",
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
    width: "90%",
    // backgroundColor: "pink",
  },
});
