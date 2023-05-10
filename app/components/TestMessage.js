import React, { useState } from "react";
import { View, Text, Button } from "react-native";

export default function TestMessage() {
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/messages");
      const data = await response.json();
      setMessage(data.join(", "));
    } catch (error) {
      console.error(error);
      setMessage("Error fetching data");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Fetch Data" onPress={fetchData} />
      <Text style={{ marginTop: 20 }}>{message}</Text>
    </View>
  );
}
