import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../Screens/ProfileScreen/ProfileScreen";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";

// Icons
import { FontAwesome, Entypo } from "@expo/vector-icons";
import Colors from "../Utils/Colors";
import { useChess } from "../Screens/BoardScreen/Design/ChessContext";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {

  const { isGuest } = useChess();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      {
        !isGuest &&
        <Tab.Screen
          name="home"
          component={HomeScreen}
          options={{
            tabBarLabel: ({ color }) => (
              <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                Home
              </Text>
            ),
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="home" size={size} color={color} />
            ),
          }}
        />
      }
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
