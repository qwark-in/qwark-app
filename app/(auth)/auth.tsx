import { View } from "tamagui";
import { useRouter } from "expo-router";
import { FilledButton } from "ui/controls/buttons";
import { BodyText } from "ui/display/typography";
import { useSafeAreaPadding } from "hooks/use-safearea-padding";
import { generateCodes } from "features/auth/helpers/generateCodes";
import { getRedirectURL } from "features/auth/helpers/getRedirectURL";
import { AuthWelcomeCarousal } from "features/auth/components/AuthWelcomeCarousal";
import { useAuthStore } from "data/stores/auth-store";
import { API_BASE_URL } from "data/api/auth/constants";

export default function AuthScreen() {
  const router = useRouter();
  const { safeAreaPadding } = useSafeAreaPadding();
  const setCodeVerifier = useAuthStore((store) => store.setCodeVerifier);

  const handlePress = async (type: "LOGIN" | "SIGNUP") => {
    const { cc: code_challenge, cv: code_verifier } = await generateCodes();
    setCodeVerifier(code_verifier);

    const params = new URLSearchParams({
      code_challenge: code_challenge,
      redirect_to: getRedirectURL(),
    });

    const loginURL = new URL(
      `${API_BASE_URL}/${type === "LOGIN" ? "login" : "sign_up"}?${params}`
    );

    router.navigate({
      pathname: "/web-view",
      params: { url: "https://qwark.in" },
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
