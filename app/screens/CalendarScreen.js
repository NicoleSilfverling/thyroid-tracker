import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarScreen({ navigation }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState({
    "2023-04-07": {
      dots: [
        { key: "red", color: "red" },
        { key: "green", color: "green" },
      ],
    },
    "2023-04-12": {
      dots: [{ key: "blue", color: "blue" }],
    },
  });

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const theme = {
    selectedDayBackgroundColor: "#ddd",
    todayTextColor: "blue",
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          ...markedDates,
          [selectedDate]: {
            ...markedDates[selectedDate],
            selected: true,
          },
        }}
        firstDay={1}
        markingType={"multi-dot"}
        theme={theme}
        style={styles.calendar}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  calendar: {
    width: 400,
    height: "80%",
  },
});
