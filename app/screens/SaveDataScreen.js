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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import SaveData from "../components/SaveData";
import SymptomBtn from "../components/SymptomBtn";
import SymptomsList from "../components/SymptomsList";
import NavigationBar from "../components/NavigationBar";

export default function SaveDataScreen({ navigation }) {
  const [popUpForm, setpopUpForm] = useState(false);
  const [activeBtn, setActiveBtn] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const [newData, setNewData] = useState(false);

  const [fetchedData, setFetchedData] = useState([]);

  const handlePress = (value) => {
    setActiveBtn(value);
    setpopUpForm(true);
  };

  useEffect(() => {
    setNewData(false);
    fetchSymptomData();
  }, [selectedDate, newData === true]);

  const fetchSymptomData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get(
        `http://localhost:8080/symptoms/${formattedDate}`,
        { headers }
      );
      setFetchedData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching symptom data:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Modal visible={popUpForm} transparent={true}>
        <SaveData
          title={activeBtn}
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
              <SymptomBtn
                colorGroup={1}
                value="TSH"
                label="TSH"
                selectedDate={formattedDate}
                fetchedData={fetchedData}
                onPress={handlePress}
              />
              <SymptomBtn
                colorGroup={1}
                value="T3"
                label="T3"
                selectedDate={formattedDate}
                fetchedData={fetchedData}
                onPress={handlePress}
              />
              <SymptomBtn
                colorGroup={1}
                value="T4"
                label="T4"
                selectedDate={formattedDate}
                fetchedData={fetchedData}
                onPress={handlePress}
              />
            </View>
            <View style={styles.content}>
              <SymptomBtn
                colorGroup={2}
                value="4"
                label="4"
                selectedDate={formattedDate}
                fetchedData={fetchedData}
                onPress={handlePress}
              />
              <SymptomBtn
                colorGroup={2}
                value="5"
                label="5"
                selectedDate={formattedDate}
                fetchedData={fetchedData}
                onPress={handlePress}
              />
              <SymptomBtn
                colorGroup={2}
                value="6"
                label="6"
                selectedDate={formattedDate}
                fetchedData={fetchedData}
                onPress={handlePress}
              />
            </View>
          </View>
          <SymptomsList
            fetchedData={fetchedData}
            selectedDate={formattedDate}
          />
        </View>
        <NavigationBar navigation={navigation} />
      </View>

      {/* <FlatList
        data={fetchedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.label}</Text>
          </View>
        )}
      /> */}
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
  },
});
