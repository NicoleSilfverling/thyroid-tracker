import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginForm({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const formattedEmail = email.toLowerCase();
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    try {
      await LoginSchema.validate({ email, password }, { abortEarly: false });
      // validation passed, submit form

      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/auth/authenticate",
          {
            email: formattedEmail,
            password: password,
          }
        );
        // Handle the response here
        console.log(response.data);
        await AsyncStorage.setItem("token", response.data.token);
        // setIsLoggedIn(true);

        AsyncStorage.getItem("token").then((token) => {
          setIsLoggedIn(Boolean(token));
        });
      } catch (error) {
        // Handle error here
        console.error(error);
      }
    } catch (error) {
      // validation failed, handle error
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>

      <TouchableOpacity style={styles.signIn} onPress={handleSubmit}>
        <Text style={{ color: "#fff" }}>Log in</Text>
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
