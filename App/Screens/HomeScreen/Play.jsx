import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import HandleVibration from "../../Components/HandleVibration";
import Colors from "../../Utils/Colors";
import { useNavigation } from "@react-navigation/native";
import { useChess } from "../BoardScreen/Design/ChessContext";

export default function Play({ isProfile = false }) {
  const { setShowRecord } = useChess();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      marginTop: isProfile ? '3%' : 0,
      height: '15%',
      backgroundColor: Colors.LIGHTGRAY,
    },
    buttons: {
      alignItems: "center",
    },
    button: {
      backgroundColor: Colors.LIGHTGREEN,
      padding: 15,
      borderRadius: 10,
      // marginTop: 10,
      width: "85%",
      alignItems: "center",
    },
    btnText: {
      color: Colors.WHITE,
      fontSize: 19,
      fontFamily: 'outfit-medium'
    },

  });

  const playHandle = () => {
    setShowRecord(false);
    HandleVibration(50); 
    navigation.navigate('board');
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={playHandle}>
          <Text style={styles.btnText}>Play</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
