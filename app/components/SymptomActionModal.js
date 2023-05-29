import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { deleteSymptomData } from "../api/api";
import Theme from "../assets/Theme";

const SymptomActionModal = ({
  activeBtn,
  setShowSymptomActionModal,
  symptomId,
  setNewData,
}) => {
  const handleDelete = async () => {
    try {
      await deleteSymptomData(symptomId);
      setNewData(true);
      console.log("Symptom deleted successfully");
    } catch (error) {
      console.error("Error deleting symptom data:", error);
    } finally {
      setShowSymptomActionModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activeBtn}</Text>
      <Text>Do you want to delete the saved data?</Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Theme.colors.red }]}
        onPress={handleDelete}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowSymptomActionModal(false)}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#007bff",
    // backgroundColor: "#fb5b5a",
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
  },
});

export default SymptomActionModal;
