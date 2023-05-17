import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const SubmitSchema = Yup.object().shape({
  value: Yup.string().required("Field is required"),
  topRef: Yup.string().required("Field is required"),
  bottomRef: Yup.string().required("Field is required"),
});

export default function SaveData({ title, setpopUpForm, selectedDate }) {
  const date = selectedDate;
  const type = title;
  const [value, setValue] = useState("");
  const [topRef, setTopRef] = useState("");
  const [bottomRef, setBottomRef] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    try {
      await SubmitSchema.validate(
        {
          value,
          topRef,
          bottomRef,
        },
        { abortEarly: false }
      );

      try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:8080/api/v1/user/symptom",
          {
            date: date,
            type: type,
            value: value,
            topRef: topRef,
            bottomRef: bottomRef,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setpopUpForm(false);
      } catch (error) {
        const errorMessage = error.message;
        console.error(error);
      }
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputBox}>
        <Text style={styles.label}>value</Text>
        <TextInput style={styles.input} onChangeText={setValue} value={value} />
        {errors.value && <Text style={styles.error}>{errors.value}</Text>}
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>top ref</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTopRef}
          value={topRef}
        />
        {errors.topRef && <Text style={styles.error}>{errors.topRef}</Text>}
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>bottom ref</Text>
        <TextInput
          style={styles.input}
          onChangeText={setBottomRef}
          value={bottomRef}
        />
        {errors.bottomRef && (
          <Text style={styles.error}>{errors.bottomRef}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={{ color: "#fff" }}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.submit}
        onPress={() => setpopUpForm(false)}
      >
        <Text style={{ color: "#fff" }}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
  },
  label: {
    fontSize: 18,
    textAlign: "center",
    alignSelf: "stretch",
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 15,
    padding: 10,
    width: "100%",
    textAlign: "center",
  },
  inputBox: {
    width: 150,
    marginTop: 20,
  },
  error: {
    color: "red",
    marginLeft: 10,
    marginTop: 5,
  },
  submit: {
    backgroundColor: "#007bff",
    // backgroundColor: "#fb5b5a",
    borderRadius: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    marginTop: 20,
  },
});
