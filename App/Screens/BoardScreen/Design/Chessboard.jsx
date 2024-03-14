import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
import Colors from "../../../Utils/Colors";

export const SIZE = width / 8;

export default function Chessboard({
  highlightedPosition = null,
}) {
  const WHITE = Colors.BOARDGREEN;
  const BLACK = Colors.BOARDLIGHTGREEN;
  // const WHITE = Colors.BLACK;
  // const BLACK = Colors.WHITE;

  // const WHITE = Colors.GRAY;
  // const BLACK = Colors.BOARDLIGHTGRAY;
  const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
  let board = [];
  for (let i = 0; i < 8; i++) {
    board.push([]);
    for (let j = 0; j < 8; j++) {
      board[i][j] = null; // Initially, no piece on squares
    }
  }

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isBlackSquare = (i + j) % 2 === 0;
      const backgroundColor = isBlackSquare ? BLACK : WHITE;
      const color = isBlackSquare ? WHITE : BLACK;
      const textStyle = { fontWeight: "500", color };
      const position = `${horizontalAxis[j]}${verticalAxis[7 - i]}`;
      const borderColor= highlightedPosition.includes(position) ? 'red' : 'transparent';
      //   const piece = // Determine piece based on position (e.g., rook on corners, pawns on rank 2)

      board[i][j] = (
        <View
          key={position}
          style={[
            styles.square,
            styles.piece,
            {
              borderWidth: 2,
              borderColor,
              backgroundColor,
              zIndex: 1,
              borderTopLeftRadius: i == 0 && j == 0 ? 5 : 0,
              borderTopRightRadius: i == 0 && j == 7 ? 5 : 0,
              borderBottomLeftRadius: i == 7 && j == 0 ? 5 : 0,
              borderBottomRightRadius: i == 7 && j == 7 ? 5 : 0,
            },
          ]}
        >
          <Text style={[textStyle, { opacity: j === 0 ? 1 : 0 }]}>
            {verticalAxis[7 - i]}
          </Text>
          {i === 7 && (
            <Text style={[textStyle, { alignSelf: "flex-end" }]}>
              {horizontalAxis[j]}
            </Text>
          )}
          {/* { piece } */}
        </View>
      );
    }
  }
  // return board;
  return (
    // Chess Board View
    <ImageBackground style={styles.column}>
      {new Array(8).fill(0).map((_, i) => (
        <View style={styles.row}>
          {new Array(8).fill(0).map((_, j) => board[i][j])}
        </View>
      ))}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  square: {
    flex: 1,
    padding: 1,
    justifyContent: "space-between",
  },
  piece: {
    height: SIZE,
    width: SIZE,
  },
});
