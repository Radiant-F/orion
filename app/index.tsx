import { ActivityIndicator, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Gap } from "@/components";
import { useEffect } from "react";
import { router } from "expo-router";

export default function Splash() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/auth");
    }, 2000);
  }, []);

  return (
    <LinearGradient
      colors={["#00BCD4", "#6A3DE8"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={"white"} />
      <Gap height={10} />
      <Text style={{ color: "white", fontStyle: "italic" }}>
        Initializing Orion ...
      </Text>
    </LinearGradient>
  );
}
