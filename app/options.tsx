import Button from "@/components/Button";
import ComboBox from "@/components/ComboBox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

interface Major {
  name: string;
  path: string;
  groups: number | string;
}

type MajorsArray = Major[][][];

export default function Index() {
  const colorScheme = useColorScheme() ?? "light";
  const router = useRouter();
  const [data, setData] = useState<MajorsArray>();
  const [userData, setUserData] = useState({
    type: 0,
    year: 0,
    major: 0,
    group: 0,
  });

  const handleSelect = (item: string, name?: string, index?: number) => {
    console.log(item, name, index);
    if (name) {
      setUserData((prev) => ({
        ...prev,
        [name]: index ?? item,
      }));
    }
  };

  const sumbitHandler = () => {
    if (data) {
      fetch(data[userData.type][userData.year][userData.major].path).then(
        (res) =>
          res.json().then((data) => {
            try {
              AsyncStorage.setItem("schedule", JSON.stringify(data));
              router.replace("/");
            } catch (e) {
              console.log(e);
            }
          })
      );
    }
  };

  useEffect(() => {
    try {
      fetch(
        "https://raw.githubusercontent.com/hubertfus/planUR-data/main/index.json"
      ).then((res) =>
        res.json().then((data) => {
          setData(data);
        })
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  return data ? (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
      }}
    >
      <View style={{ width: "100%" }}>
        <View style={styles.ComboBoxContainer}>
          <ThemedText type={"subtitle"}>Stopień studiów:</ThemedText>
          <ComboBox
            data={data.map((_, i) => `stopień ${i + 1}`)}
            onSelect={handleSelect}
            type="stopień"
            name="type"
          />
        </View>
        <View style={styles.ComboBoxContainer}>
          <ThemedText type={"subtitle"}>Rok studiów:</ThemedText>
          <ComboBox
            data={
              userData.type >= 0
                ? data[userData.type].map((_, i) => `Rok ${i + 1}`)
                : []
            }
            onSelect={handleSelect}
            type="rok studiów"
            name="year"
          />
        </View>
        <View style={styles.ComboBoxContainer}>
          <ThemedText type={"subtitle"}>Kierunek:</ThemedText>
          <ComboBox
            data={
              userData.type >= 0 && userData.year >= 0
                ? data[userData.type][userData.year].map((e) => e.name)
                : []
            }
            onSelect={handleSelect}
            type="kierunek"
            name="major"
          />
        </View>
        <View style={styles.ComboBoxContainer}>
          <ThemedText type={"subtitle"}>lab:</ThemedText>
          <TextInput
            inputMode="numeric"
            placeholder={`podaj liczbe z przedziału 1 -${
              data && data[userData.type][userData.year][userData.major].groups
            }`}
            placeholderTextColor={Colors[colorScheme].text}
            style={{
              borderColor: colorScheme === "dark" ? Colors.light.tint : "#ccc",
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              color: Colors[colorScheme].text,
              fontSize: 16,
            }}
            maxLength={2}
            onChangeText={(e) =>
              setUserData((prev) => ({ ...prev, group: parseInt(e) }))
            }
          />
        </View>
      </View>
      <Button title="Zapisz" onPress={sumbitHandler} />
    </ThemedView>
  ) : (
    <ThemedView>
      <ActivityIndicator size={"large"} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  ComboBoxContainer: {
    paddingVertical: 16,
    flexDirection: "column",
    width: "100%",
  },
});
