import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { fetchUserFirstname } from "../api/api";

export default function Welcome() {
  const [firstname, setFirstname] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFirstname = await fetchUserFirstname();
        setFirstname(userFirstname);
      } catch (error) {
        console.error("Error fetching user firstname:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View>
      <Text>Welcome, {firstname}!</Text>
    </View>
  );
}
