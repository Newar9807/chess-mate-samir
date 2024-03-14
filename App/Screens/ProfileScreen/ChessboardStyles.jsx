// ChessboardStyles.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Chessboard from "./Chessboard";
import Colors from "../../Utils/Colors";

const ChessboardStyles = ({ selectedStyle, onSelectStyle }) => {
  const colorOptions = {
    first: { white: Colors.BOARDGREEN, black: Colors.BOARDLIGHTGREEN },
    second: { white: Colors.BOARDLIGHTGRAY, black: Colors.GRAY },
    // third: { white: Colors.WHITE, black: Colors.BLACK },
    // fourth: { white: Colors.WHITE, black: Colors.BLACK },
    // fourth: { white: "", black: "" },
  };
  const style = "first";
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Chessboard Style</Text>
      <View style={styles.optionsContainer}>
        {Object.keys(colorOptions).map((style, index) => (
          <TouchableOpacity
            key={style}
            style={[
              styles.optionButton,
              selectedStyle === style && styles.selectedOption,
            ]}
            onPress={() => onSelectStyle(style)}
          >
            <Chessboard
              white={colorOptions[style].white}
              black={colorOptions[style].black}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "outfit-medium",
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  optionButton: {
    justifyContent: "center",
    padding: 5,
    borderRadius: 9,
    borderWidth: 1.5,
    borderBlockColor: Colors.GRAY,
  },
  selectedOption: {
    backgroundColor: Colors.LIGHTGREEN,
  },
  rowManager: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ChessboardStyles;
