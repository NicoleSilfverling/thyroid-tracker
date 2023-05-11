import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function LoginScreen({ setIsLoggedIn }) {
  const [active, setActive] = useState("login");

  return (
    <View style={styles.container}>
      <View
        style={active == "login" ? styles.logoBoxLogin : styles.logoBoxRegister}
      >
        <Image
          source={require("../assets/logoThy.png")}
          style={active == "login" ? styles.imgLogin : styles.imgRegister}
        />
        <Text
          style={active == "login" ? styles.logoLogin : styles.logoRegister}
        >
          MyThyroid
        </Text>
      </View>

      <View style={styles.content}>
        {active === "login" ? (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <RegisterForm setIsLoggedIn={setIsLoggedIn} />
        )}

        <View style={styles.loginRegisterBox}>
          {active == "login" ? (
            <View style={{ flexDirection: "row" }}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity onPress={() => setActive("register")}>
                <Text style={{ color: "#007bff" }}>Sign up</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Text>Have an account? </Text>

              <TouchableOpacity onPress={() => setActive("login")}>
                <Text style={{ color: "#007bff" }}>Log in</Text>
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
  content: {
    width: "60%",
  },
  loginRegisterBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    justifyContent: "center",
  },

  logoBoxLogin: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoBoxRegister: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  logoLogin: {
    fontWeight: "bold",
    fontSize: 50,
    // color: "#fb5b5a",
    color: "#007bff",
    marginBottom: 10,
  },
  logoRegister: {
    fontWeight: "bold",
    fontSize: 38,
    // color: "#fb5b5a",
    color: "#007bff",
  },
  imgLogin: {
    width: 150,
    height: 150,
    tintColor: "#007bff",
  },
  imgRegister: {
    width: 80,
    height: 80,
    tintColor: "#007bff",
  },
});
