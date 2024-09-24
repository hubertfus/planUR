import React, { useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Pressable,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

interface ComboBoxProps {
  data: string[];
  type: string;
  name?: string;
  keyExtractor?: (item: string, index: number) => string;
  onSelect?: (item: string, name?: string, index?: number) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({
  data,
  type,
  name,
  keyExtractor,
  onSelect,
}) => {
  const colorScheme = useColorScheme() ?? "light";
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(data[0]);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleSelectItem = (item: string, index: number) => {
    setSelectedItem(item);
    setDropdownVisible(false);
    if (onSelect) {
      onSelect(item, name, index);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleDropdown}>
        <View
          style={[
            styles.input,
            {
              borderColor: colorScheme === "dark" ? Colors.light.tint : "#ccc",
              borderBottomLeftRadius: isDropdownVisible ? 0 : 8,
              borderBottomRightRadius: isDropdownVisible ? 0 : 8,
            },
          ]}
        >
          <ThemedText
            style={[
              styles.inputText,
              {
                borderColor:
                  colorScheme === "dark" ? Colors.light.tint : "#ccc",
              },
            ]}
          >
            {selectedItem || `Wybierz ${type}`}
          </ThemedText>
        </View>
      </Pressable>
      {isDropdownVisible && (
        <View
          style={[
            styles.dropdown,
            {
              borderColor: colorScheme === "dark" ? Colors.light.tint : "#ccc",
            },
          ]}
        >
          <FlatList
            data={data}
            keyExtractor={keyExtractor || ((_, index) => index.toString())}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  {
                    borderColor:
                      colorScheme === "dark" ? Colors.light.tint : "#ccc",
                  },
                ]}
                onPress={() => handleSelectItem(item, index)}
              >
                <ThemedText style={styles.itemText}>{item}</ThemedText>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 8,
  },
  inputText: {
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderTopWidth: 0,
    maxHeight: 150,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: "hidden",
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
});

export default ComboBox;
