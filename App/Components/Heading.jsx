import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "../Utils/Colors";

export default function Heading({
  text,
  isViewAll = false,
  isRecord = false,
  isStats = false,
}) {
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      alignSelf: isRecord || isStats ? "center" : "stretch",
      justifyContent: "space-between",
    },
    heading: {
      fontSize: 21,
      fontFamily: "outfit-medium",
      color: Colors.BLACK,
      // backgroundColor: Colors.BOARDGRAY,
      marginBottom: 10,
      marginLeft: !isRecord ? 8 : isStats ? 0 : 0,
      // marginTop: isRecord ? 15 : isStats ? 0 : 0,
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{text}</Text>
      {isViewAll && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("tutorial");
          }}
        >
          <Text>View All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
