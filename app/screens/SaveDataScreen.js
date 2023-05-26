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
import { symptomOptions } from "../constants/symptomOptions";

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
    setActiveBtn(value);
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
            <Text>Bloodwork</Text>
            <View style={styles.content}>
              {symptomOptions.map((symptomOption, index) => {
                if (symptomOption.group === 1) {
                  return (
                    <SymptomBtn
                      key={index}
                      group={symptomOption.group}
                      value={symptomOption.label}
                      label={symptomOption.label}
                      selectedDate={formattedDate}
                      fetchedData={fetchedData}
                      onPress={(value) =>
                        handlePress(value, symptomOption.group)
                      }
                    />
                  );
                } else {
                  return null;
                }
              })}
            </View>

            <Text>Symptoms</Text>
            <View style={styles.content}>
              {symptomOptions.map((symptomOption, index) => {
                if (symptomOption.group === 2) {
                  return (
                    <SymptomBtn
                      key={index}
                      group={symptomOption.group}
                      value={symptomOption.label}
                      label={symptomOption.label}
                      selectedDate={formattedDate}
                      fetchedData={fetchedData}
                      onPress={(value) =>
                        handlePress(value, symptomOption.group)
                      }
                    />
                  );
                } else {
                  return null;
                }
              })}
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
    marginTop: 30,
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 10,
    flexWrap: "wrap",
  },
});
