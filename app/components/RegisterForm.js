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

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegisterForm({ setIsLoggedIn }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const formattedEmail = email.toLowerCase();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    try {
      await RegisterSchema.validate(
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
        { abortEarly: false }
      );
      // validation passed, submit form

      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/register",
          {
            firstName: firstName,
            lastName: lastName,
            email: formattedEmail,
            password: password,
          }
        );
        // Handle the response here
        await AsyncStorage.setItem("token", response.data.token);
        AsyncStorage.getItem("token").then((token) => {
          setIsLoggedIn(Boolean(token));
        });
        console.log(response.data);
      } catch (error) {
        // Handle error here
        const errorMessage = error.message;
        console.error(error);
        // console.log(errorMessage);
      }

      console.log("Registration successful");
    } catch (error) {
      // validation failed, handle error
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text style={styles.label}>First name:</Text>
        <TextInput
          style={styles.input}
          placeholder="First name"
          onChangeText={setFirstName}
          value={firstName}
        />
        {errors.firstName && (
          <Text style={styles.error}>{errors.firstName}</Text>
        )}
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Last name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Last name"
          onChangeText={setLastName}
          value={lastName}
        />
        {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Comfirm password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        {errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.signIn} onPress={handleRegister}>
        <Text style={{ color: "#fff" }}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    textAlign: "left",
    alignSelf: "stretch",
    marginLeft: 5,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  inputBox: {
    width: "100%",
    marginTop: 20,
  },
  error: {
    color: "red",
    marginLeft: 10,
    marginTop: 5,
  },

  signIn: {
    backgroundColor: "#007bff",
    // backgroundColor: "#fb5b5a",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
});
