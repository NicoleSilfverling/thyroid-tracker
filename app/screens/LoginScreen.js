import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [active, setActive] = useState("login");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const onChangeHandler = (name, value) => {
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "loginPassword":
        setLoginPassword(value);
        break;
      case "loginEmail":
        setLoginEmail(value);
        break;
      default:
        break;
    }
  };

  const onSubmitLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          email: loginEmail,
          password: loginPassword,
        }
      );
      // Handle the response here
      console.log(response.data);
      await AsyncStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };

  const onSubmitRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }
      );
      // Handle the response here
      console.log(response.data);
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>MyThyroid</Text>

        {active === "login" ? (
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inputTxt}
              placeholder="Email"
              onChangeText={(value) => onChangeHandler("loginEmail", value)}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.inputTxt}
              placeholder="Password"
              onChangeText={(value) => onChangeHandler("loginPassword", value)}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.signIn} onPress={onSubmitLogin}>
              <Text style={{ color: "#fff" }}>Log in</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={styles.inputTxt}
              placeholder="First name"
              onChangeText={(value) => onChangeHandler("firstName", value)}
            />
            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={styles.inputTxt}
              placeholder="Last name"
              onChangeText={(value) => onChangeHandler("lastName", value)}
              secureTextEntry={false}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inputTxt}
              placeholder="Email"
              onChangeText={(value) => onChangeHandler("email", value)}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.inputTxt}
              placeholder="Password"
              onChangeText={(value) => onChangeHandler("password", value)}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.signIn} onPress={onSubmitRegister}>
              <Text style={{ color: "#fff" }}>Register</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.loginRegister}>
          {active == "login" ? (
            <View style={{ flexDirection: "row" }}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: active === "register" ? "#007bff" : "#fff",
                }}
                onPress={() => setActive("register")}
              >
                <Text
                  style={{
                    color: active === "register" ? "#fff" : "#007bff",
                  }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Text>Have an account? </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: active === "login" ? "#007bff" : "#fff",
                }}
                onPress={() => setActive("login")}
              >
                <Text
                  style={{ color: active === "login" ? "#fff" : "#007bff" }}
                >
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginRegister: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    // color: "#fb5b5a",
    color: "#007bff",
    marginBottom: 40,
  },

  inputTxt: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  signIn: {
    backgroundColor: "#007bff",
    // backgroundColor: "#fb5b5a",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  label: {
    // fontSize: 16,
    // fontWeight: "bold",
    textAlign: "left",
    alignSelf: "stretch",
    marginLeft: 5,
    marginBottom: 5,
  },
});
