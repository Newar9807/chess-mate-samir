import { View, Text } from "react-native";
import React from "react";
import { Chess } from "chess.js";

export const Check = () => {
  const chess = new Chess();
  const is_check = chess.in_checkmate();
  return <View>{is_check}</View>;
};
