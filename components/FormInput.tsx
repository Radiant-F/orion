import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Gap from "./Gap";
import { useState } from "react";

type Props = {
  onChangeText?: (text: string) => void;
  password?: boolean;
  title?: string;
  icon?: keyof typeof Icon.glyphMap;
  placeholder?: string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  keyboardType?: KeyboardTypeOptions;
};

export default function FormInput({
  onChangeText,
  password,
  title = "Name Input",
  icon = "ab-testing",
  placeholder = "Text input...",
  autoCapitalize,
  keyboardType,
}: Props) {
  const [secure, setSecure] = useState(true);

  return (
    <View>
      <Text style={{ color: "white" }}>{title}</Text>
      <View style={styles.viewInput}>
        <Icon name={icon} size={25} color={"white"} />
        <Gap width={5} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#ffffff40"}
          secureTextEntry={password && secure}
          style={styles.input}
          onChangeText={onChangeText}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
        />
        {password && (
          <TouchableOpacity
            style={styles.btnEye}
            onPress={() => setSecure(!secure)}
          >
            <Icon name={secure ? "eye-off" : "eye"} color={"white"} size={25} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50,
    color: "white",
  },
  btnEye: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewInput: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
});
