import React from "react";
import { View, StyleSheet } from "react-native";
import { width } from "../BoardScreen/Design/Notation";

const Chessboard = ({ white, black }) => {
  const renderChessboard = () => {
    const boardSize = 8; // 8x8 chessboard
    const squares = [];

    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const squareId = `${row}-${col}`;
        const isDarkSquare = (row + col) % 2 === 1;
        squares.push(
          <View
            key={squareId}
            style={[
              styles.square,
              isDarkSquare
                ? { backgroundColor: white }
                : { backgroundColor: black },
                {borderTopLeftRadius: row == 0 && col == 0 ? 5: 0,},
                {borderTopRightRadius: row == 0 && col == 7 ? 5: 0,},
                {borderBottomLeftRadius: row == 7 && col == 0 ? 5: 0,},
                {borderBottomRightRadius: row == 7 && col == 7 ? 5: 0,},
            ]}
          ></View>
        );
      }
    }

    return squares;
  };

  return <View style={styles.board}>{renderChessboard()}</View>;
};

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 5,
    width: width / 2.5,
  },
  square: {
    width: width / 20,
    height: width / 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chessboard;
