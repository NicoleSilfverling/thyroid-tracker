import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Welcome() {
  const [firstName, setFirstName] = useState("");

  const getUserInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:8080/api/v1/user/firstname",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const userInfo = await getUserInfo();
      setFirstName(userInfo);
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>Welcome, {firstName}!</Text>
    </View>
  );
}
