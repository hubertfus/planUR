import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Modal,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import Button from "@/components/Button";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";

export default function Initial() {
  const colorScheme = useColorScheme() ?? "light";
  const slideAnimTop = useRef(new Animated.Value(-1000)).current;
  const slideAnimBottom = useRef(new Animated.Value(1000)).current;
  const router = useRouter();
  const [count, setCount] = useState(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnimTop, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnimBottom, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [slideAnimTop, slideAnimBottom]);

  const sumbitHandler = () => {
    router.replace("options");
  };

  return (
    <ThemedView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignItems: "center",
          margin: 20,
        }}
      >
        <Animated.View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            transform: [{ translateY: slideAnimTop }],
          }}
        >
          <ThemedText type={"title"}>PlanUR</ThemedText>
          <ThemedText type={"link"}>(Lepsze od CoTera)</ThemedText>
        </Animated.View>

        <Animated.View
          style={{
            flex: 3,
            justifyContent: "space-evenly",
            alignItems: "center",
            transform: [{ translateY: slideAnimBottom }],
          }}
        >
          <ThemedText type={"subtitle"} style={{ textAlign: "center" }}>
            We to se skonfiguruj czy cuś itd...
          </ThemedText>

          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: colorScheme === "dark" ? "#1D3D47" : "#A1CEDC",
              },
            ]}
          >
            <HelloWave
              size={100}
              onPress={() => {
                setCount((prev) => prev + 1);
                count > 5 && Alert.alert("już się pobawiłeś?");
              }}
            />
          </View>

          <Button title="dalej" onPress={sumbitHandler} />
        </Animated.View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    width: 300,
    borderRadius: 1000,
  },
  headerImage: {
    color: "#808080",
    width: 100,
    height: 100,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
  },
});
