import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Backdrop, Button, FormInput, Gap } from "@/components";
import { router } from "expo-router";

export default function Auth() {
  return (
    <LinearGradient colors={["#00BCD4", "#6A3DE8"]} style={styles.container}>
      <Backdrop />
      <View style={styles.viewContent}>
        <Text style={styles.textTitle}>Sign In</Text>
        <Gap height={20} />
        <FormInput
          title="Email"
          icon="gmail"
          placeholder="example@email.com"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Gap height={20} />
        <FormInput
          title="Password"
          icon="lock"
          placeholder="Password..."
          password
          autoCapitalize="none"
        />
        <Gap height={20} />
        <Button
          style={styles.btn}
          title="Sign In"
          onPress={() => router.replace("/(tabs)")}
        />
        <Gap height={10} />
        <Button style={styles.btnSignUp} title="Sign Up" primary={false} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 45,
    borderRadius: 45 / 2,
    shadowColor: "black",
    shadowOffset: { height: 3, width: 2 },
    shadowRadius: 1.5,
    shadowOpacity: 0.25,
    elevation: 3,
    marginHorizontal: 20,
  },
  btnSignUp: {
    width: 200,
    alignSelf: "center",
    height: 45,
    borderRadius: 45 / 2,
    shadowColor: "black",
    shadowOffset: { height: 3, width: 2 },
    shadowRadius: 1.5,
    shadowOpacity: 0.25,
    elevation: 3,
    marginHorizontal: 20,
  },
  textTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  viewContent: {
    width: "85%",
    borderRadius: 30,
    maxWidth: 520,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
