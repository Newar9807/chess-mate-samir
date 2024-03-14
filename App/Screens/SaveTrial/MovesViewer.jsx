// MovesViewer.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const MovesViewer = ({ moves }) => {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const handleNextMove = () => {
    if (currentMoveIndex < moves.length - 1) {
      setCurrentMoveIndex(currentMoveIndex + 1);
    }
  };

  const handlePrevMove = () => {
    if (currentMoveIndex > 0) {
      setCurrentMoveIndex(currentMoveIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.moveText}>{moves[currentMoveIndex]}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Previous Move" onPress={handlePrevMove} />
        <Button title="Next Move" onPress={handleNextMove} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  moveText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default MovesViewer;
