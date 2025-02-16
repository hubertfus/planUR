import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import Toggle from "./Toggle";

type Class = {
  class: string;
  endAt: string;
  name: string;
  startAt: string;
  teacher: string;
  type: string;
  week?: "A" | "B";
};

type ClassesListItemProps = {
  classes: Class | Class[];
  currentWeek: "A" | "B";
  setWeek: (e: "A" | "B") => void;
};

const ClassesListItem: React.FC<ClassesListItemProps> = ({
  classes,
  currentWeek,
  setWeek,
}) => {
  const classArray = Array.isArray(classes) ? classes : [classes];

  // Sprawdza, czy istnieją klasy do wyświetlenia dla aktualnego tygodnia
  const filteredClasses = classArray.filter(
    (classItem) => !classItem.week || classItem.week === currentWeek // Klasy bez tygodnia lub zgodne z aktualnym tygodniem
  );

  // Sprawdza, czy klasy mają różne tygodnie
  const hasDifferentWeeks =
    classArray.some((classItem) => classItem.week === "A") &&
    classArray.some((classItem) => classItem.week === "B");

  // Jeśli brak klas do wyświetlenia, nie renderuj kafelka
  if (filteredClasses.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {filteredClasses.map((classItem, index) => (
        <View key={index} style={styles.itemContainer}>
          <ThemedText style={{ textAlign: "center" }}>
            {classItem.type}
          </ThemedText>
          <ThemedText style={{ textAlign: "center" }} type="defaultSemiBold">
            {classItem.name}
          </ThemedText>
          <ThemedText style={{ textAlign: "center" }}>
            {classItem.teacher}
          </ThemedText>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ThemedText type="defaultSemiBold">{classItem.class}</ThemedText>

            <ThemedText type="defaultSemiBold">
              {classItem.startAt} - {classItem.endAt}
            </ThemedText>
          </View>
        </View>
      ))}
      {hasDifferentWeeks && (
        <Toggle
          label1="A"
          label2="B"
          defaultValue={currentWeek === "B"}
          containerStyle={{
            flexDirection: "column",
            width: 50,
            borderLeftWidth: 1,
            borderLeftColor: "#ddd",
          }}
          onToggleChange={(value) => setWeek(value ? "B" : "A")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    overflow: "hidden",
  },
  itemContainer: {
    padding: 10,
    flex: 1,
  },
});

export default ClassesListItem;
