import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Yup from "yup";
import SymptomSlider from "./SymptomSlider";
import { postSymptomData } from "../api/api";

const SubmitSchema = Yup.object().shape({
  value: Yup.number()
    .typeError("Must be a number")
    .required("Field is required"),
  topRef: Yup.number()
    .typeError("Must be a number")
    .required("Field is required"),
  bottomRef: Yup.number()
    .typeError("Must be a number")
    .required("Field is required"),
});

export default function SaveData({
  type,
  activeGroup,
  setpopUpForm,
  selectedDate,
  setNewData,
}) {
  const date = selectedDate;
  // const type = label;
  const [value, setValue] = useState();
  const [topRef, setTopRef] = useState();
  const [bottomRef, setBottomRef] = useState();
  const [errors, setErrors] = useState({});

  const handleSliderValueChange = (val) => {
    setValue(val);
    setTopRef(5);
    setBottomRef(1);
  };

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

      const data = {
        date: date,
        type: type,
        value: value,
        topRef: topRef,
        bottomRef: bottomRef,
      };
      await postSymptomData(data);

      setNewData(true);
      setpopUpForm(false);
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
      <Text style={styles.title}>{type}</Text>
      {activeGroup === 1 ? (
        <View>
          <View style={styles.inputBox}>
            <Text style={styles.label}>value</Text>
            <TextInput
              style={styles.input}
              onChangeText={setValue}
              value={value}
              keyboardType="numeric"
            />
            {errors.value && <Text style={styles.error}>{errors.value}</Text>}
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.type}>top ref</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTopRef}
              value={topRef}
              keyboardType="numeric"
            />
            {errors.topRef && <Text style={styles.error}>{errors.topRef}</Text>}
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.type}>bottom ref</Text>
            <TextInput
              style={styles.input}
              onChangeText={setBottomRef}
              value={bottomRef}
              keyboardType="numeric"
            />
            {errors.bottomRef && (
              <Text style={styles.error}>{errors.bottomRef}</Text>
            )}
          </View>
        </View>
      ) : (
        <SymptomSlider value={value} onValueChange={handleSliderValueChange} />
      )}

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
