import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import SaveData from "../components/SaveData";
import SymptomBtn from "../components/SymptomBtn";
import SymptomsList from "../components/SymptomsList";
import NavigationBar from "../components/NavigationBar";
import { fetchSymptomDataByDate } from "../api/api";
import { symptomOptions } from "../constants/symptomOptions";
import SymptomActionModal from "../components/SymptomActionModal";

export default function SaveDataScreen({ navigation }) {
  const [popUpForm, setpopUpForm] = useState(false);
  const [showSymptomActionModal, setShowSymptomActionModal] = useState(false);
  const [activeBtn, setActiveBtn] = useState("");
  const [activeGroup, setActiveGroup] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = format(selectedDate, "yyyy-MM-dd");
  const [newData, setNewData] = useState(false);

  const [fetchedData, setFetchedData] = useState([]);
  const [symptomId, setSymptomId] = useState(null);

  const handlePress = (type, group) => {
    setActiveBtn(type);

    const matchingSymptom = fetchedData.find(
      (symptom) => symptom.type === type
    );

    if (matchingSymptom) {
      const { id } = matchingSymptom;
      setShowSymptomActionModal(true);
      setSymptomId(id);
    } else {
      setActiveGroup(group);
      setpopUpForm(true);
    }
  };

  useEffect(() => {
    setNewData(false);
    fetchSymptomData();
  }, [selectedDate, newData === true]);

  const fetchSymptomData = async () => {
    try {
      const data = await fetchSymptomDataByDate(formattedDate);
      setFetchedData(data);
    } catch (error) {
      // Error handling is already done in the API service function
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Modal visible={popUpForm} transparent={true}>
        <SaveData
          type={activeBtn}
          activeGroup={activeGroup}
          setpopUpForm={setpopUpForm}
          selectedDate={formattedDate}
          setNewData={setNewData}
        />
      </Modal>
      <Modal visible={showSymptomActionModal} transparent={true}>
        <SymptomActionModal
          setShowSymptomActionModal={setShowSymptomActionModal}
          symptomId={symptomId}
          setNewData={setNewData}
          activeBtn={activeBtn}
        />
      </Modal>
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.screenContent}>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={(event, date) => {
                if (date !== undefined) {
                  setSelectedDate(date);
                }
              }}
            />

            <View style={styles.contentContainer}>
              <Text style={styles.groupTitle}>Bloodwork</Text>
              <View style={styles.content}>
                {symptomOptions.map((symptomOption, index) => {
                  if (symptomOption.group === 1) {
                    return (
                      <SymptomBtn
                        key={index}
                        group={symptomOption.group}
                        value={symptomOption.type}
                        type={symptomOption.type}
                        selectedDate={formattedDate}
                        fetchedData={fetchedData}
                        onPress={(type) =>
                          handlePress(type, symptomOption.group)
                        }
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </View>

              <Text style={styles.groupTitle}>Symptoms</Text>
              <View style={styles.content}>
                {symptomOptions.map((symptomOption, index) => {
                  if (symptomOption.group === 2) {
                    return (
                      <SymptomBtn
                        key={index}
                        group={symptomOption.group}
                        value={symptomOption.type}
                        type={symptomOption.type}
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
        </ScrollView>
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
  scrollContainer: {
    // flex: 1,
    // padding: 20,
    width: "100%",
    height: "100%",
    // backgroundColor: "#fff",
    marginBottom: 40,
  },
  screenContent: {
    width: "90%",
    height: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
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
  groupTitle: {
    fontWeight: "500",
  },
});
