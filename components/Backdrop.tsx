import { View } from "react-native";

export default function Backdrop({ opacity = 0.25 }: { opacity?: number }) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "black",
        position: "absolute",
        opacity,
      }}
    />
  );
}
