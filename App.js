import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import Authentication from "./App/Authentication/Authentication";
import InternetCheck from "./App/Components/InternetCheck";
import { useFonts } from "expo-font";
import { ChessProvider } from "./App/Screens/BoardScreen/Design/ChessContext";
import NoInternet from "./App/Components/NoInternet";

const App = () => {
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require("./assets/fonts/Outfit-Regular.ttf"),
    'outfit-medium': require("./assets/fonts/Outfit-Medium.ttf"),
    'outfit-bold': require("./assets/fonts/Outfit-Bold.ttf"),
  });
  const isConnected = InternetCheck();
  return (
    <ChessProvider>
      { isConnected ? <Authentication /> : <NoInternet /> }
    </ChessProvider>
  );
};

export default App;
