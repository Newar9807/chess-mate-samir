import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveGameRecord = async (recordName, moves) => {
  try {
    const gameRecord = {
      moves,
      // ... (other relevant data you want to save)
    };
    await AsyncStorage.setItem(recordName, JSON.stringify(gameRecord));
    console.log(`Game record "${recordName}" saved successfully.`);
  } catch (error) {
    console.error('Error saving game record:', error);
    throw error;
  }
};

export const promptUserForName = async () => {
  // Implement a function to prompt the user for a name and return it
  // You can use Alert.prompt or a custom modal for this purpose
  // Return the user-provided name or null if canceled
};

export const getGameRecord = async (recordName) => {
  try {
    const gameRecordString = await AsyncStorage.getItem(recordName);
    return gameRecordString ? JSON.parse(gameRecordString) : null;
  } catch (error) {
    console.error('Error retrieving game record:', error);
    throw error;
  }
};

// ... (other AsyncStorage helper functions as needed)
