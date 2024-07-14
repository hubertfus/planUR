import { Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "./ThemedView";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function Button({ title, onPress }: Props) {
  const backgroundColor = useSharedValue("#4895ef");
  const rotationAnimation = useSharedValue(0);

  const handlePressIn = () => {
    backgroundColor.value = withTiming("#3a7bcb", { duration: 150 });
    rotationAnimation.value = withTiming(3, { duration: 150 });
  };

  const handlePressOut = () => {
    backgroundColor.value = withTiming("#4895ef", { duration: 150 });
    rotationAnimation.value = withTiming(0, { duration: 150 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ flexDirection: "row" }}
      onPress={onPress}
    >
      <Animated.View style={[animatedStyle, styles.container]}>
        <ThemedText type="subtitle" style={{ letterSpacing: 2 }}>
          {title}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
