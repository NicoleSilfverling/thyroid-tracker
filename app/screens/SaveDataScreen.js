import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import SaveData from "../components/SaveData";
import SymptomBtn from "../components/SymptomBtn";
import SymptomsList from "../components/SymptomsList";
import NavigationBar from "../components/NavigationBar";
import { fetchSymptomDataByDate } from "../api/api";

const symptomBtnData = [
  {
    group: 1,
    value: "TSH",
    label: "TSH",
  },
  {
    group: 1,
    value: "T3",
    label: "T3",
  },
  {
    group: 1,
    value: "T4",
    label: "T4",
  },
  {
    group: 2,
    value: "Energy",
    label: "Energy",
  },
  {
    group: 2,
    value: "Health",
    label: "Health",
  },
  {
    group: 2,
    value: "Anxiety",
    label: "Anxiety",
  },
  // {
  //   group: 2,
  //   value: "Muscle weakness",
  //   label: "Muscle weakness",
  // },
];

export default function SaveDataScreen({ navigation }) {
  const [popUpForm, setpopUpForm] = useState(false);
  const [activeBtn, setActiveBtn] = useState("");
  const [activeGroup, setActiveGroup] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const [newData, setNewData] = useState(false);

  const [fetchedData, setFetchedData] = useState([]);

  const handlePress = (value, group) => {
    setActiveGroup(group);
    console.log(activeGroup);
    setActiveBtn(value);
    console.log(value);
    setpopUpForm(true);
  };

  useEffect(() => {
    setNewData(false);
    fetchSymptomData();
  }, [selectedDate, newData === true]);

  const fetchSymptomData = async () => {
    try {
      const data = await fetchSymptomDataByDate(formattedDate);
      setFetchedData(data);
      console.log(data);
    } catch (error) {
      // Error handling is already done in the API service function
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Modal visible={popUpForm} transparent={true}>
        <SaveData
          title={activeBtn}
          activeGroup={activeGroup}
          setpopUpForm={setpopUpForm}
          selectedDate={formattedDate}
          setNewData={setNewData}
        />
      </Modal>
      <View style={styles.container}>
        <View style={styles.screenContent}>
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

          <View style={styles.contentContainer}>
            <View style={styles.content}>
              {symptomBtnData.map((symptomBtnData, index) => (
                <SymptomBtn
                  key={index}
                  group={symptomBtnData.group}
                  value={symptomBtnData.value}
                  label={symptomBtnData.label}
                  selectedDate={formattedDate}
                  fetchedData={fetchedData}
                  onPress={(value) => handlePress(value, symptomBtnData.group)}
                />
              ))}
            </View>
          </View>
          <SymptomsList
            fetchedData={fetchedData}
            selectedDate={formattedDate}
          />
        </View>
        <NavigationBar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  screenContent: {
    width: "90%",
    height: "100%",
    alignItems: "center",
  },
  contentContainer: {
    width: "100%",
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 30,
    flexWrap: "wrap",
  },
});
