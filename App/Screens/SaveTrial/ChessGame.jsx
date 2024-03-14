// ChessGame.jsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import MovesViewer from './MovesViewer';

const ChessGame = () => {
  const [moves, setMoves] = useState([]);

  useEffect(() => {
    loadMoves();
  }, []);

  const saveMoves = async () => {
    try {
      await AsyncStorage.setItem('chessMoves', JSON.stringify(moves));
      console.log('Moves saved successfully');
    } catch (error) {
      console.error('Error saving moves:', error);
    }
  };

  const loadMoves = async () => {
    try {
      const savedMoves = await AsyncStorage.getItem('chessMoves');
      if (savedMoves) {
        setMoves(JSON.parse(savedMoves));
      }
    } catch (error) {
      console.error('Error loading moves:', error);
    }
  };

  const addMove = (move) => {
    setMoves([...moves, move]);
  };

  const handleMove = () => {
    const newMove = 'e4'; // Replace with the actual move
    addMove(newMove);
    saveMoves();
  };

  return (
    <View>
      <Text>Chess Game</Text>
      <Button title="Make Move" onPress={handleMove} />
      <MovesViewer moves={moves} />
    </View>
  );
};

export default ChessGame;
