import React, { useState, useEffect, useRef } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ListRenderItemInfo,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { daysPolish } from "@/constants/Months";

type DateSpinnerProps = {
  currentDate: Date; // Nowa właściwość
  onDateSelected?: (date: Date) => void;
};

function DateSpinner({ currentDate, onDateSelected }: DateSpinnerProps) {
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const monthDates = generateDatesForMonth(currentDate);
    setDates(monthDates);
    setSelectedDate(currentDate);

    if (onDateSelected) {
      onDateSelected(currentDate);
    }

    const todayIndex = monthDates.findIndex(
      (date) => date.toDateString() === currentDate.toDateString()
    );

    if (flatListRef.current && todayIndex !== -1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: todayIndex,
          animated: true,
        });
      }, 0);
    }
  }, [currentDate]);

  const generateDatesForMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    let dates: Date[] = [];

    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }

    return dates;
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelected) {
      onDateSelected(date);
    }
  };

  const renderDateItem = ({ item }: ListRenderItemInfo<Date>) => {
    const isSelected = item.toDateString() === selectedDate?.toDateString();
    return (
      <TouchableOpacity onPress={() => handleDateSelect(item)}>
        <View style={[styles.dateItem, isSelected && styles.selectedDateItem]}>
          <ThemedText
            style={[
              styles.dateText,
              isSelected && styles.selectedDateText,
              { letterSpacing: 12 },
            ]}
            type="title"
          >
            {String(item.getDate()).padStart(2, "0")}
          </ThemedText>
          <ThemedText style={styles.dateText} type="defaultSemiBold">
            {daysPolish[item.getDay()]}
          </ThemedText>
        </View>
      </TouchableOpacity>
    );
  };

  const getItemLayout = (
    data: ArrayLike<Date> | null | undefined,
    index: number
  ) => ({
    length: 70,
    offset: 70 * index,
    index,
  });

  const onScrollToIndexFailed = (info: any) => {
    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={dates}
        renderItem={renderDateItem}
        keyExtractor={(item) => item.getTime().toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 150,
  },
  dateItem: {
    width: 60,
    padding: 10,
    height: 120,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDateItem: {
    backgroundColor: "#007bff",
  },
  dateText: {},
  selectedDateText: {
    color: "#fff",
  },
});

export default DateSpinner;
