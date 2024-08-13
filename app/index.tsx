import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import IconButton from "@/components/IconButton";
import DateSpinner from "@/components/DateSpinner"; // Ensure the path is correct
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { monthsPolish } from "@/constants/Months";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const checkSchedule = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("schedule");
        console.log(jsonValue);
        if (jsonValue == null) router.replace("initial");
      } catch (e) {
        // error reading value
      }
    };
    checkSchedule();
  }, []);

  const handleDateSelected = (selectedDate: Date) => {
    setDate(selectedDate);
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: StatusBar.currentHeight,
        padding: 20,
      }}
    >
      <View style={styles.headerContainer}>
        <IconButton name="sunny-outline" size={36} />
        <ThemedText type="subtitle">
          {monthsPolish[date.getMonth()]} {date.getFullYear()}
        </ThemedText>
        <IconButton
          name="settings-outline"
          size={36}
          onPress={() => router.navigate("options")}
        />
      </View>
      <DateSpinner
        initialStartDate={new Date()}
        onDateSelected={handleDateSelected}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});
