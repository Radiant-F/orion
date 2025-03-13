import { View } from "react-native";

export default function Gap({
  width,
  height,
  flex,
}: {
  width?: number;
  height?: number;
  flex?: number;
}) {
  return <View style={{ width, height, flex }} />;
}
