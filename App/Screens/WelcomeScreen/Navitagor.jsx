import { View, Text } from "react-native";
import React from "react";
import WelcomeScreen from "./WelcomeScreen";
import StackScreen from "../StackScreen/StackScreen";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="StackScreen" component={StackScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
