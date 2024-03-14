import {
  StyleSheet,
  View,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";
import { useSharedValue, useAnimatedStyle } from "react-native-reanimated";

const App = (id, startPosition, chess, onTurn, enabled) => {
  const isGestureActive = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const translateX = useSharedValue(startPosition.x * SIZE);
  const translateY = useSharedValue(startPosition.y * SIZE);
  // Create animated values for translation
  const valueXY = new Animated.ValueXY({ x: 100, y: 50 }); // Initial position

  const animatedStyles = useAnimatedStyle(() => ({
    position: "absolute",
    zIndex: isGestureActive.value ? 100 : 10,
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  // Add a mechanism to trigger the animation (example using a button)
  const onPress = () => {
    Animated.timing(valueXY, {
      toValue: { x: 200, y: 150 }, // Example target position
      duration: 500, // Animation duration
    }).start();
  };

  return (
    // Add the missing closing curly brace here
    <View>
      <Animated.View style={[styles.box, animatedStyles]}>
        <Text>Hello</Text>
      </Animated.View>
      <TouchableOpacity onPress={onPress}>
        <Text>Animate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  box: {
    height: 120,
    width: 120,
    backgroundColor: "#b58df1",
    borderRadius: 20,
    marginBottom: 30,
  },
});
