import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Gap } from "@/components";
import { Audio } from "expo-av";

export default function Home() {
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/starry-night.mp3")
    );
    setSound(sound);
    await sound.playAsync();
    setIsPlaying(true);
  }
  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <LinearGradient colors={["#00BCD4", "#6A3DE8"]} style={{ flex: 1 }}>
      <Gap height={StatusBar.currentHeight} />
      <View style={styles.viewCover}>
        <View style={styles.imgCover} />
      </View>
      <Gap flex={1} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Gap flex={0.1} />
        <TouchableNativeFeedback>
          <View style={{ ...styles.btnMainControl, width: 50, height: 50 }}>
            <Icon name="skip-previous" color={"white"} size={30} />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          useForeground
          onPress={() => {
            isPlaying ? pauseSound() : playSound();
          }}
          onLongPress={async () => {
            if (sound) {
              await sound.stopAsync();
              await sound.unloadAsync();
              setIsPlaying(false);
            }
          }}
        >
          <View style={styles.btnMainControl}>
            <Icon
              name={isPlaying ? "pause" : "play"}
              color={"white"}
              size={50}
            />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback>
          <View style={{ ...styles.btnMainControl, width: 50, height: 50 }}>
            <Icon name="skip-previous" color={"white"} size={30} />
          </View>
        </TouchableNativeFeedback>
        <Gap flex={0.1} />
      </View>
      <Gap flex={1} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  viewCover: {
    margin: 20,
    height: 400,
  },
  imgCover: {
    backgroundColor: "black",
    borderRadius: 20,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  btnMainControl: {
    width: 75,
    height: 75,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75 / 2,
  },
});
