import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { View } from "tamagui";
import { Redirect, useRouter } from "expo-router";
import {
  hasHardwareAsync,
  isEnrolledAsync,
  LocalAuthenticationResult,
} from "expo-local-authentication";
import { useSettigsStore } from "data/stores/settings-store";
import { useUserStore } from "data/stores/user-store";
import { authenticateWithBiometrics } from "features/local-auth/authenticateWithBiometrics";
import { BodyText, TitleText } from "ui/display/typography";

import { FilledButton } from "ui/controls/buttons";
import { QwarkLogoLg } from "ui/assets/logos";

export default function LocalAuth() {
  const router = useRouter();
  const [localAuthResult, setLocalAuthResult] = useState("");
  const isBiometricsEnabled = useSettigsStore((store) => store.isBiometricsEnabled);
  const name = useUserStore((store) => store.name);

  if (!isBiometricsEnabled || Platform.OS === "web") {
    console.log("Redirecting to profile-check...");
    return <Redirect href="/profile-check" />;
  }

  console.log(localAuthResult);

  const handleBiometrics = async () => {
    const result: LocalAuthenticationResult | undefined =
      await authenticateWithBiometrics();

    if (result?.success) {
      router.replace("/profile-check");
    } else if (result?.error) {
      setLocalAuthResult(result?.error);
    }
  };

  useEffect(() => {
    (async function () {
      const checkBiometric = async () => {
        const hasHardware = await hasHardwareAsync();
        const isEnrolled = await isEnrolledAsync();

        return hasHardware && isEnrolled;
      };
      const hasBiometrics = await checkBiometric();

      if (!hasBiometrics) {
        router.replace("/dashboard-tab");
      }

      if (isBiometricsEnabled) {
        handleBiometrics();
      }
    })();
  }, []);

  return (
    <View flex={1} ai="center" jc="center" gap="$10" px="$5">
      <View ai="center" position="absolute" top="$12" left={0} right={0}>
        <TitleText size="$large" fow="$emphasized">
          Hey, {name.first}!
        </TitleText>
        <BodyText mt="$2">Welcome back to Qwark</BodyText>
      </View>
      <View ai="center">
        <QwarkLogoLg />
        <TitleText mt="$4" size="$large" fow="$emphasized">
          Qwark Locked
        </TitleText>
        <BodyText mt="$1">Access your account securely</BodyText>
        <FilledButton mt="$6" onPress={handleBiometrics}>
          TAP TO UNLOCK
        </FilledButton>
      </View>
    </View>
  );
}
