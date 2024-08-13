import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";

import { useEffect } from "react";

type Props = {
  size?: number;
  onPress?: () => void;
};

export function HelloWave({ size, onPress }: Props) {
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
      4,
      false,
      () => {
        rotationAnimation.value = 0;
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Pressable
      onPress={() => {
        startAnimation();
        onPress && onPress();
      }}
    >
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
