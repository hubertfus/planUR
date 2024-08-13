import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Pressable, StyleSheet, useColorScheme, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props extends IconProps<keyof typeof Ionicons.glyphMap> {
  style?: ViewStyle;
  onPress?: () => void;
}

export default function IconButton({
  name,
  size,
  color,
  style,
  onPress,
}: Props) {
  const [isPressed, setIsPressed] = useState(false);
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Pressable
      style={[styles.button, style]}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
    >
      <Ionicons
        name={name}
        size={size}
        color={
          color ||
          (isPressed && Colors[colorScheme].tabIconSelected) ||
          Colors[colorScheme].tabIconDefault
        }
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
  },
});
