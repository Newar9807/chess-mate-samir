import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PieceHint = ({ pieceType, position, possibleMoves }) => {
    console.log(possibleMoves)
  return (
    <View style={styles.hintContainer}>
      <Text style={styles.hintText}>{`Possible Moves for ${pieceType} at ${position}:`}</Text>
      <View>
        {possibleMoves.map((move, index) => (
          <Text key={index} style={styles.moveText}>{`- ${move}`}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hintContainer: {
    display: 'flex',
    // flexDirection: 'row',
    backgroundColor: "rgba(255, 255, 0, 0.8)",
    padding: 10,
    borderRadius: 5,
    // position: "absolute",
    zIndex: 999,
  },
  hintText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  moveText: {
    fontSize: 14,
  },
});

export default PieceHint;
