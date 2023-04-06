import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/HomeScreen";
import CalendarScreen from "./app/screens/CalendarScreen";
import GraphScreen from "./app/screens/GraphScreen";
import MedicinScreen from "./app/screens/MedicinScreen";
import SaveDataScreen from "./app/screens/SaveDataScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Graph" component={GraphScreen} />
        <Stack.Screen name="Meds" component={MedicinScreen} />
        <Stack.Screen name="SaveData" component={SaveDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
