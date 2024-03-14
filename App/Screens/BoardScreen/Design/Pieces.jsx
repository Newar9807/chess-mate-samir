import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  TapGestureHandler,
  State,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { toTranslation, SIZE, toPosition } from "./Notation";
import { useChess } from "./ChessContext";
import HandleVibration from "../../../Components/HandleVibration";

const styles = StyleSheet.create({
  piece: {
    width: SIZE,
    height: SIZE,
  },
});

const PIECES = {
  br: require("../../../../assets/pieces/br.png"),
  bp: require("../../../../assets/pieces/bp.png"),
  bn: require("../../../../assets/pieces/bn.png"),
  bb: require("../../../../assets/pieces/bb.png"),
  bq: require("../../../../assets/pieces/bq.png"),
  bk: require("../../../../assets/pieces/bk.png"),
  wr: require("../../../../assets/pieces/wr.png"),
  wn: require("../../../../assets/pieces/wn.png"),
  wb: require("../../../../assets/pieces/wb.png"),
  wq: require("../../../../assets/pieces/wq.png"),
  wk: require("../../../../assets/pieces/wk.png"),
  wp: require("../../../../assets/pieces/wp.png"),
};

const Pieces = ({
  key,
  id,
  startPosition,
  chess,
  onTurn,
  enabled,
  setGameStatus,
  setModalVisible,
  isTapped,
  setIsTapped,
  putPieceType,
  putPosition,
  updatePutPiece,
  updatePutPosition,
  clearHighlightedPosition
}) => {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(startPosition.x);
  const translateY = useSharedValue(startPosition.y);

  const movePiece = useCallback(
    (to, switchTurn) => {
      try {
        const moves = chess.moves({ verbose: true });
        const from = toPosition({ x: offsetX.value, y: offsetY.value });
        const move = moves.find((m) => m.from === from && m.to === to);

        const { x, y } = toTranslation(move ? move.to : from);
        translateX.value = withTiming(
          x,
          {},
          () => (offsetX.value = translateX.value)
        );
        translateY.value = withTiming(y, {}, () => {
          offsetY.value = translateY.value;
          isGestureActive.value = false;
        });

        const turn = chess.turn() == "w" ? "WHITE" : "BLACK";
        if (move) {
          setGameStatus("Success");
          // Check for pawn promotion
          const promotionRank = chess.turn() === "w" ? 8 : 1;

          // console.log(move.flags, move.from, move.to, promotionRank)

          // Check for capturing and promoting on the 8th rank (cp flag)
          if (
            move.flags.includes("cp") ||
            (move.flags.includes("np") &&
              parseInt(move.to[1]) === promotionRank)
          ) {
            // Handle capturing and promoting
            chess.put({ type: "q", color: chess.turn() }, move.from);
            setGameStatus(turn + " Pawn promoted to Queen");
          }
          chess.move({ from, to });

          switchTurn();
          if (chess.isCheckmate()) {
            setModalVisible(true);
            HandleVibration(500);
          } else if (chess.isCheck()) {
            HandleVibration(250);
          }
        } else {
          // Set game status to indicate invalid move
          HandleVibration(100);
          setGameStatus("Invalid move !!");
          return;
        }
        clearHighlightedPosition();
      } catch (err) {
        console.log("Error:", err);
        setGameStatus("An error occurred. Please try again.");
      }
    },
    [chess, isGestureActive, offsetX, offsetY, onTurn, translateX, translateY]
  );

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      isGestureActive.value = true;
    },
    onActive: ({ translationX, translationY }) => {
      if (
        translateX.value >= 0 &&
        translateY.value <= 350 &&
        translateX.value <= 350 &&
        translateY.value >= 0
      ) {
        translateX.value = offsetX.value + translationX;
        translateY.value = offsetY.value + translationY;
      }
    },
    onEnd: () => {
      runOnJS(movePiece)(
        toPosition({ x: translateX.value, y: translateY.value }),
        onTurn
      );
    },
  });

  const original = useAnimatedStyle(() => ({
    position: "absolute",
    width: SIZE,
    height: SIZE,
    zIndex: 5,
    backgroundColor: isGestureActive.value
      ? "rgba(255, 255, 0, 0.5)"
      : "transparent",
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
  }));

  const underlay = useAnimatedStyle(() => {
    const position = toPosition({ x: translateX.value, y: translateY.value });
    const translation = toTranslation(position);
    return {
      position: "absolute",
      width: SIZE,
      height: SIZE,
      zIndex: 5,
      backgroundColor: isGestureActive.value
        ? "rgba(255, 255, 0, 0.5)"
        : "transparent",
      transform: [{ translateX: translation.x }, { translateY: translation.y }],
    };
  });

  const tapRef = useRef(null);

  const onPieceTap = useCallback(() => {
    setIsTapped(!isTapped);
  }, [isTapped]);

  const handleSingleTap = () => {
    updatePutPiece(id);
    updatePutPosition(toPosition({ x: offsetX.value, y: offsetY.value }));
    runOnJS(onPieceTap)();
  };

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: isGestureActive.value ? 100 : 10,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <>
      {/* <Animated.View style={original} />
      <Animated.View style={underlay} /> */}
      <PanGestureHandler onGestureEvent={onGestureEvent} enabled={enabled}>
        <Animated.View style={style}>
          <TapGestureHandler
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE) {
                handleSingleTap();
              }
            }}
            waitFor={tapRef}
          >
              <Image key={key} source={PIECES[id]} style={styles.piece} />
          </TapGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default Pieces;
