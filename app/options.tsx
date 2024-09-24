import Button from "@/components/Button";
import ComboBox from "@/components/ComboBox";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
  const colorPlaceholderScheme = useThemeColor(
    { light: "#000000", dark: "#ffffff" },
    "dark"
  );
  const router = useRouter();
  const [data, setData] = useState<MajorsArray>();
  const [userData, setUserData] = useState({
    type: 0,
    year: 0,
    major: 0,
    group: 0,
  });

  const handleSelect = (item: string, name?: string, index?: number) => {
    if (name === "group" && index !== undefined) index += 1;
    if (name) {
      setUserData((prev) => ({
        ...prev,
        [name]: index ?? item,
      }));
    }
  };

  const sumbitHandler = () => {
    if (data) {
      fetch(data[userData.type][userData.year][userData.major].path)
        .then((res) =>
          res.json().then((data) => {
            if (data[userData.group])
              try {
                AsyncStorage.setItem(
                  "schedule",
                  JSON.stringify(data[userData.group])
                );
                router.replace("/");
              } catch (e) {
                Alert.alert(
                  "aha",
                  "Prawdopodobnie nie mam planu dla was. \n napisz mi na dc to zobaczymy co da się zrobić -> kierowcapksu"
                );
              }
            else
              Alert.alert(
                "aha",
                "Prawdopodobnie nie mam planu dla was. \n napisz mi na dc to zobaczymy co da się zrobić -> kierowcapksu"
              );
          })
        )
        .catch(() =>
          Alert.alert(
            "aha",
            "Prawdopodobnie nie mam planu dla was. \n napisz mi na dc to zobaczymy co da się zrobić -> kierowcapksu"
          )
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
            keyExtractor={(item) => item} 
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
            keyExtractor={(_, index) => `rok-${index}`} 
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
            keyExtractor={(item) => item} 
            type="kierunek"
            name="major"
          />
        </View>
        <View style={styles.ComboBoxContainer}>
          <ThemedText type={"subtitle"}>lab:</ThemedText>
          <ComboBox
            data={
              userData.type >= 0 &&
              userData.year >= 0 &&
              userData.major >= 0
                ? Array.from(
                    { length: Number(data[userData.type][userData.year][userData.major].groups) },
                    (_, i) => `Lab ${i + 1}`
                  )
                : []
            }
            onSelect={handleSelect}
            keyExtractor={(_, index) => `lab-${index}`} 
            type="lab"
            name="group"
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
