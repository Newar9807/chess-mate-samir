import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useChess } from "./Design/ChessContext";
import MasterFile from "./Design/MasterFile";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../Utils/Colors";
import { height } from "./Design/Notation";

const BoardScreen = () => {
  const { isGuest } = useChess();

  const navigation = useNavigation();
  
  const backOption = () => {
    isGuest ? navigation.navigate('profile') : navigation.navigate('home');
  }

  return (
    <View style={{ backgroundColor: Colors.LIGHTGRAY, height }}>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          padding: 20,
        }}
        onPress={backOption}
      >
        <Ionicons name="arrow-back-circle-outline" size={27} color="black" />
        <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
          {isGuest? <Text>Profile</Text> : <Text>Home</Text>}
        </Text>
      </TouchableOpacity>
      <MasterFile />
    </View>
  );
};

export default BoardScreen;
