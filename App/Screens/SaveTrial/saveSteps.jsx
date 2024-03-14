import React, { useState, useEffect } from 'react';
import { View, Text, AsyncStorage, Button } from 'react-native';

const ChessGame = () => {
  const [moves, setMoves] = useState([]);

  // Load moves from storage on component mount
  useEffect(() => {
    loadMoves();
  }, []);

  // Function to save moves to AsyncStorage
  const saveMoves = async () => {
    try {
      await AsyncStorage.setItem('chessMoves', JSON.stringify(moves));
      console.log('Moves saved successfully');
    } catch (error) {
      console.error('Error saving moves:', error);
    }
  };

  // Function to load moves from AsyncStorage
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

  // Function to add a move to the list
  const addMove = (move) => {
    setMoves([...moves, move]);
  };

  // Example usage: Add a move and save moves to storage
  const handleMove = () => {
    const newMove = 'e4'; // Replace with the actual move
    addMove(newMove);
    saveMoves();
  };

  return (
    <View>
      <Text>Chess Game</Text>
      <Button title="Make Move" onPress={handleMove} />
    </View>
  );
};

export default ChessGame;
