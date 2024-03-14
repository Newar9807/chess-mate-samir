// Timer.jsx
import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { View, Text, StyleSheet } from "react-native";

const Timer = forwardRef(({ limitInMinutes }, ref) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setPaused] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (!isPaused) {
      timerInterval = setInterval(() => {
        setElapsedSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    // Cleanup the interval on component unmount
    return () => clearInterval(timerInterval);
  }, [isPaused]); // Included isPaused in the dependency array

  const remainingSeconds = Math.max(limitInMinutes * 60 - elapsedSeconds, 0);
  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingSecondsDisplay = remainingSeconds % 60;

  const resetTimer = () => {
    setElapsedSeconds(0);
    setPaused(false);
  };

  const togglePause = () => {
    setPaused(!isPaused);
  };

  //==> Expose functions to the parent component using useImperativeHandle <==//
  useImperativeHandle(ref, () => ({
    pause: togglePause,
    reset: resetTimer,
    now: () => `${remainingMinutes}:${remainingSecondsDisplay < 10 ? "0" : ""}${remainingSecondsDisplay}`,
  }));

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>
        {remainingSeconds === 0
          ? "Time's up!"
          : `Time: ${remainingMinutes}:${remainingSecondsDisplay < 10 ? "0" : ""}${remainingSecondsDisplay}`}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Timer;
