import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  TapGestureHandler,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';

const TapExample = () => {
  const tapRef = useRef(null);

  const [result, setResult] = useState(null);

  const handleSingleTap = () => {
    // Your function that returns something based on the parameters
    const functionResult = yourFunctionWithParameters(/* pass your parameters here */);

    // Set the result to the state to display it
    setResult(functionResult);
  };

  const handleDoubleTap = () => {
    // Your function for double tap if needed
    // For example, you can reset the result or perform another action
    setResult(null);
  };

  const yourFunctionWithParameters = () => {
    // Your logic here, you can perform any computation based on parameters
    // For example, let's return a simple string for demonstration purposes
    return 'Function Result!';
  };

  return (
    <View style={styles.container}>
      <TapGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            handleSingleTap();
          }
        }}
        waitFor={tapRef}
      >
        <TapGestureHandler
          ref={tapRef}
          numberOfTaps={2}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              handleDoubleTap();
            }
          }}
        >
          <View style={styles.box}>
            <Text>{result}</Text>
          </View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TapExample;
