import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useEffect } from "react";

type Props = {
  size?: number;
};

export function HelloWave({ size }: Props) {
  const rotationAnimation = useSharedValue(0);
  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(25, { duration: 150 }),
        withTiming(0, { duration: 150 })
      ),
      4, // Run the animation 4 times
      false, // Not to reverse
      () => {
        rotationAnimation.value = 0; // Reset the value after animation completes
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Pressable onPress={startAnimation}>
      <Animated.View style={animatedStyle}>
        <Text
          style={[
            styles.text,
            { fontSize: size || 28, lineHeight: (size || 28) * 2 },
          ]}
        >
          👋
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: 32,
    marginTop: -6,
  },
});
