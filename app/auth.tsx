import { View } from "tamagui";
import { FilledButton } from "ui/controls/buttons";
import { useSafeAreaPadding } from "hooks/use-safearea-padding";
import { BodyText } from "ui/display/typography";
import { generateCodes } from "features/auth/helpers/generateCodes";
import { useAuthStore } from "data/stores/auth-store";
import { useRouter } from "expo-router";
import { getRedirectURL } from "features/auth/helpers/getRedirectURL";
import { API_BASE_URL } from "data/api/auth/constants";
import { AuthWelcomeCarousal } from "features/auth/components/AuthWelcomeCarousal";

export default function AuthScreen() {
  const { safeAreaPadding } = useSafeAreaPadding();
  const setCodeVerifier = useAuthStore((store) => store.setCodeVerifier);
  const router = useRouter();

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

    // router.navigate({
    //   pathname: '/web-view',
    //   params: { url: loginURL.href },
    // });
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
            onPress={() => handlePress("LOGIN")}
          >
            Login here
          </BodyText>
        </BodyText>
      </View>
    </View>
  );
}
