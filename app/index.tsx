import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import IconButton from "@/components/IconButton";
import DateSpinner from "@/components/DateSpinner";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { monthsPolish } from "@/constants/Months";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import ClassesListItem from "@/components/ClassesListItem";
import { WeeksContext } from "@/ctx/WeeksContext";

export default function Index() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState<Schedule>();
  const colorScheme = useColorScheme() ?? "light";
  const [week, setWeek] = useState<"A" | "B">("A");
  const { getWeekType, setWeeks } = useContext(WeeksContext);
  useEffect(() => {
    let e;

    if (e) {
      setWeeks(JSON.parse(e));
    } else {
      fetch(
        "https://raw.githubusercontent.com/hubertfus/planUR-data/main/weeks.json"
      ).then((e) =>
        e.json().then((res) => {
          if (res) {
            AsyncStorage.setItem("weeks", JSON.stringify(res));
            setWeeks(res);
          }
        })
      );
    }
    setWeek(getWeekType(date) || "A");
    const checkSchedule = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("schedule");

        if (jsonValue == null) router.replace("initial");
        else setSchedule(JSON.parse(jsonValue));
      } catch (e) {
        // error reading value
      }
    };
    checkSchedule();
  }, []);

  const handleDateSelected = (selectedDate: Date) => {
    setWeek(getWeekType(selectedDate) || "A");
    setDate(selectedDate);
  };

  const changeMonth = (direction: "prev" | "next") => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + (direction === "next" ? 1 : -1));
      setWeek(getWeekType(newDate) || "A");

      return newDate;
    });
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        padding: 20,
      }}
    >
      <View style={styles.headerContainer}>
        <IconButton name="sunny-outline" size={36} />
        <TouchableOpacity onPress={() => changeMonth("prev")}>
          <ThemedText type="subtitle" style={styles.changeMonthButton}>
            &lt;
          </ThemedText>
        </TouchableOpacity>
        <ThemedText type="subtitle">
          {monthsPolish[date.getMonth()]} {date.getFullYear()}
        </ThemedText>
        <TouchableOpacity onPress={() => changeMonth("next")}>
          <ThemedText type="subtitle" style={styles.changeMonthButton}>
            &gt;
          </ThemedText>
        </TouchableOpacity>
        <IconButton
          name="settings-outline"
          size={36}
          onPress={() => router.navigate("options")}
        />
      </View>
      <DateSpinner currentDate={date} onDateSelected={handleDateSelected} />
      {schedule ? (
        date.getDay() !== 0 && schedule[date.getDay() - 1] ? (
          <FlatList
            data={schedule[date.getDay() - 1] || []}
            renderItem={({ item }) => {
              return <ClassesListItem classes={item} currentWeek={week} />;
            }}
            keyExtractor={(_, index) =>
              `${date.toDateString()}-${date.getDay()}-${index}`
            }
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 40,
              width: "100%",
            }}
          >
            <Image source={require("../assets/images/fajrant.gif")} />
            <ThemedText type="title" style={{ textAlign: "center" }}>
              Fajrant!!
            </ThemedText>
          </View>
        )
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size={"large"} color={Colors[colorScheme].text} />
        </View>
      )}
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
  changeMonthButton: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
});
