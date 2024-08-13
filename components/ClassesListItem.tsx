import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import Toggle from "./Toggle";

type ClassesListItemProps = {
  classes: Class | Class[];
  currentWeek: "A" | "B";
};

const ClassesListItem: React.FC<ClassesListItemProps> = ({
  classes,
  currentWeek,
}) => {
  const [week, setWeek] = useState<"A" | "B">(currentWeek);
  const hasWeekInfo =
    Array.isArray(classes) && classes.some((classItem) => classItem.week);

  const renderClasses = () => {
    return (Array.isArray(classes) ? classes : [classes])
      .filter((classItem) => !hasWeekInfo || classItem.week === week)
      .map((classItem, index) => (
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
      ));
  };

  return (
    <View style={styles.container}>
      {renderClasses()}
      {hasWeekInfo && (
        <Toggle
          label1="A"
          label2="B"
          defaultValue={week === "B"}
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
