import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import { ThemedText } from "./ThemedText";

interface ToggleProps {
  label1?: string;
  label2?: string;
  defaultValue?: boolean; // Nowa właściwość do ustawienia domyślnego stanu
  containerStyle?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  activeButtonStyle?: StyleProp<ViewStyle>;
  inactiveButtonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
  inactiveTextStyle?: StyleProp<TextStyle>;
  onToggleChange?: (value: boolean) => void; // Nowa właściwość do przekazywania stanu toggle
}

const Toggle: React.FC<ToggleProps> = ({
  label1 = "Option 1",
  label2 = "Option 2",
  defaultValue = false,
  containerStyle,
  buttonStyle,
  activeButtonStyle,
  inactiveButtonStyle,
  textStyle,
  activeTextStyle,
  inactiveTextStyle,
  onToggleChange,
}) => {
  const [isToggled, setIsToggled] = useState(defaultValue);

  const toggleSwitch = () => {
    const newValue = !isToggled;
    setIsToggled(newValue);
    if (onToggleChange) {
      onToggleChange(newValue); // Informowanie rodzica o zmianie
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.button,
          buttonStyle,
          !isToggled ? styles.active : styles.inactive,
          !isToggled ? activeButtonStyle : inactiveButtonStyle,
        ]}
        onPress={toggleSwitch}
      >
        {!isToggled ? (
          <Text
            style={[
              styles.text,
              !isToggled ? styles.textActive : styles.textInactive,
              textStyle,
              !isToggled ? activeTextStyle : inactiveTextStyle,
            ]}
          >
            {label1}
          </Text>
        ) : (
          <ThemedText>{label1}</ThemedText>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          buttonStyle,
          isToggled ? styles.active : styles.inactive,
          isToggled ? activeButtonStyle : inactiveButtonStyle,
        ]}
        onPress={toggleSwitch}
      >
        {isToggled ? (
          <Text
            style={[
              styles.text,
              isToggled ? styles.textActive : styles.textInactive,
              textStyle,
              isToggled ? activeTextStyle : inactiveTextStyle,
            ]}
          >
            {label2}
          </Text>
        ) : (
          <ThemedText>{label2}</ThemedText>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  active: {
    backgroundColor: "#007bff",
  },
  inactive: {},
  text: {
    fontSize: 16,
  },
  textActive: {
    color: "#fff",
  },
  textInactive: {
    color: "#fff",
  },
});

export default Toggle;
