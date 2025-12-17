import { useEffect } from "react";
import { View } from "tamagui";
import { ActivityIndicator } from "react-native";
import { TitleText } from "ui/display/typography";
import { useLogin } from "features/auth/hooks";

export default function Login() {
  const { login } = useLogin();

  useEffect(() => {
    login();
  }, []);

  return (
    <View f={1} jc="center" ai="center">
      <TitleText mb="$4">Logging in...</TitleText>
      <ActivityIndicator size="large" />
    </View>
  );
}
