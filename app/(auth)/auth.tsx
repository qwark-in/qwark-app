import { View } from "tamagui";
import { useRouter } from "expo-router";
import { FilledButton } from "ui/controls/buttons";
import { BodyText } from "ui/display/typography";
import { useSafeAreaPadding } from "hooks/use-safearea-padding";
import { AuthWelcomeCarousal } from "features/auth/components/AuthWelcomeCarousal";
import { useAuthURL } from "features/auth/hooks/use-auth-url";
import { AuthType } from "features/auth/types";
import { Platform } from "react-native";

const IS_SSO_AUTH = process.env.EXPO_PUBLIC_FEATURE_SSO_AUTH === "true";

export default function AuthScreen() {
  const router = useRouter();
  const { safeAreaPadding } = useSafeAreaPadding();
  const { getAuthURL } = useAuthURL();

  const handlePress = async (type: AuthType) => {
    if (!IS_SSO_AUTH) {
      router.navigate("/login");
      return;
    }

    const authURL = await getAuthURL(type);

    if (Platform.OS === "web") {
      // Same-window navigation on web
      window.location.href = authURL.href;
      return;
    }

    router.navigate({
      pathname: "/web-view",
      params: { url: authURL.href },
      // params: { url: "https://qwark.in" },
    });
  };

  return (
    <View f={1} jc="space-between" {...safeAreaPadding}>
      <AuthWelcomeCarousal />
      <View mt="$8" p="$5" boxShadow="0 -2px 16px 0 rgba(22, 22, 22, 0.12)">
        <FilledButton
          onPress={() => handlePress("SIGNUP")}
          testID="welcome-continue-button"
        >
          Signup
        </FilledButton>
        <BodyText mt="$3" size="$xsmall" fow="$emphasized" ta="center">
          If you already have already registered,{" "}
          <BodyText
            size="$xsmall"
            fow="$emphasized"
            color="$qwark/primary"
            textDecorationLine="underline"
            cursor="pointer"
            onPress={() => handlePress("LOGIN")}
          >
            Login here
          </BodyText>
        </BodyText>
      </View>
    </View>
  );
}
