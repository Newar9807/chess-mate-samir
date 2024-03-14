import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../../Components/Header";
import Play from "./Play";
import RecordScreen from "./RecordScreen";
import Colors from "../../Utils/Colors";
import { useChess } from "../BoardScreen/Design/ChessContext";

export default function HomeScreen() {
  const { resetRecord } = useChess();

  const onPress = () => {
    resetRecord()
  }

  return (
    <View>
      {/* Header */}
      <Header isProfile={false} />
      <View style={styles.subSection}>
        {/* World Record */}
        <RecordScreen />
        {/* Play Button */}
      </View>
      {/* <TouchableOpacity style={styles.touchable} onPress={onPress}>
      <Text style={styles.text}>Reset Record</Text>
    </TouchableOpacity> */}
      <Play isProfile={false}/>
    </View>
  );
}

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subSection: {
    padding: "2%",
    backgroundColor: Colors.LIGHTGRAY,
  },
});
