import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./app/screens/HomeScreen";
import CalendarScreen from "./app/screens/CalendarScreen";
import GraphScreen from "./app/screens/GraphScreen";
import MedicinScreen from "./app/screens/MedicinScreen";
import SaveDataScreen from "./app/screens/SaveDataScreen";
import LoginScreen from "./app/screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

function PrivateStack({ children, isLoggedIn, setIsLoggedIn }) {
  return isLoggedIn ? (
    <Stack.Navigator>{children}</Stack.Navigator>
  ) : (
    <LoginScreen setIsLoggedIn={setIsLoggedIn} />
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      setIsLoggedIn(Boolean(token));
    });
  }, []);
  return (
    <NavigationContainer>
      <PrivateStack isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Graph" component={GraphScreen} />
        <Stack.Screen name="Meds" component={MedicinScreen} />
        <Stack.Screen name="SaveData" component={SaveDataScreen} />
      </PrivateStack>
    </NavigationContainer>
  );
}
