import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import SaveData from "../components/SaveData";
import SymptomBtn from "../components/SymptomBtn";
import SymptomsList from "../components/SymptomsList";

export default function SaveDataScreen({ navigate }) {
  const [popUpForm, setpopUpForm] = useState(false);
  const [activeBtn, setActiveBtn] = useState("");

  const [selected, setSelected] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const handlePress = (value) => {
    setActiveBtn(value);
    setpopUpForm(true);
    const isSelected = selected.includes(value);
    if (isSelected) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Modal visible={popUpForm} transparent={true}>
        <SaveData
          title={activeBtn}
          setpopUpForm={setpopUpForm}
          selectedDate={formattedDate}
        />
      </Modal>
      <View style={styles.container}>
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(event, date) => {
            if (date !== undefined) {
              setSelectedDate(date);
              console.log(selectedDate);
            }
          }}
        />
      </View>
      <View style={styles.content}>
        <SymptomBtn
          colorGroup={1}
          value="TSH"
          label="TSH"
          selected={selected.includes("TSH")}
          onPress={handlePress}
        />
        <SymptomBtn
          colorGroup={1}
          value="T3"
          label="T3"
          selected={selected.includes("T3")}
          onPress={handlePress}
        />
        <SymptomBtn
          colorGroup={1}
          value="T4"
          label="T4"
          selected={selected.includes("T4")}
          onPress={handlePress}
        />
      </View>
      <View style={styles.content}>
        <SymptomBtn
          colorGroup={2}
          value="4"
          label="4"
          selected={selected.includes("4")}
          onPress={handlePress}
        />
        <SymptomBtn
          colorGroup={2}
          value="5"
          label="5"
          selected={selected.includes("5")}
          onPress={handlePress}
        />
        <SymptomBtn
          colorGroup={2}
          value="6"
          label="6"
          selected={selected.includes("6")}
          onPress={handlePress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    // backgroundColor: "blue",
    marginTop: 30,
  },
});
