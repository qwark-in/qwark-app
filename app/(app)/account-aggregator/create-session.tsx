import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, XStack } from "tamagui";
import { useToastController } from "@tamagui/toast";
import SmsListener from "react-native-android-sms-listener";
import { useUserStore } from "data/stores/user-store";
import { useSafeAreaPadding } from "hooks/use-safearea-padding";
import { useFetchFipListMutation, useTriggerAuthOTP, useValidateAuthOTP } from "data/api";
import { useAAStore } from "data/stores/aa-store";
import { useOTP } from "ui/controls/otp/use-otp";
import { CamsfinservLogoLg, QwarkLogoWithTextXs } from "ui/assets/logos";
import { Icon } from "ui/assets/icons/adaptive";
import { BodyText, TitleText } from "ui/display/typography";
import { OTPInput } from "ui/controls/otp/OTPInput";

export default function CreateSessionScreen() {
  const router = useRouter();
  const toast = useToastController();
  const phone = useUserStore((store) => store.phone);
  const consentHandles = useAAStore((store) => store.consent_handles);
  const setSessionId = useAAStore((store) => store.setSessionId);
  const setSelectedEntities = useAAStore((store) => store.setSelectedEntities);
  const { safeAreaPadding } = useSafeAreaPadding();
  const { fetchFipListTigger } = useFetchFipListMutation();

  const { triggerAuthOTP } = useTriggerAuthOTP();
  const { validateAuthOTP } = useValidateAuthOTP();

  const onVerify = async () => {
    setSelectedEntities(["EQUITIES", "MF_ETF_OTHERS"]);
    await fetchFipListTigger();
    router.replace("/(app)/account-aggregator/account-discovery");
  };

  const verifyFn = async (code: string) => {
    try {
      const response = await validateAuthOTP({
        consent_handle: consentHandles[0].consent_handle!,
        mobile_number: phone,
        otp: code,
      });
      console.log("sesion_id: ", response.data.session_id);
      setSessionId(response.data.session_id);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const init = async () => {
    try {
      await triggerAuthOTP({
        consent_handle: consentHandles[0].consent_handle,
        mobile_number: phone,
      });
      console.log("OTP Triggered Successfully");
    } catch (err) {
      console.log("Error in trigger auth otp", err);
      toast.show("Could not send otp");
      setTimeout(() => {
        router.back();
      }, 750);
    }
  };

  const otp = useOTP({
    onSuccess: onVerify,
    verifyFn: verifyFn,
  });

  useEffect(() => {
    const subscription = SmsListener.addListener((message) => {
      if (message) {
        const codeMatch = message.body.match(new RegExp(`\\b\\d{${6}}\\b`));
        if (!codeMatch) {
          return null;
        }

        otp.handleCode(codeMatch[0]);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <View f={1} {...safeAreaPadding}>
      <View p="$5" pt="$6" gap="$5">
        <XStack w="100%" ai="center" jc="space-between">
          <QwarkLogoWithTextXs />

          <Icon name="chainlink" />
          <CamsfinservLogoLg />
        </XStack>

        <View mt="$2">
          <TitleText fow="$emphasized">
            Qwark partners with CAMS Finserv to securely connect your accounts.
          </TitleText>
          <BodyText mt="$2" color="#6F6F6F">
            Enter the OTP sent to your registered mobile number:{" "}
            <BodyText fow="$emphasized" mt="$_5">
              +91-{phone}
            </BodyText>
          </BodyText>
        </View>
        <TitleText>Verification Code</TitleText>
        <OTPInput {...otp} onResend={init} />
      </View>
    </View>
  );
}
