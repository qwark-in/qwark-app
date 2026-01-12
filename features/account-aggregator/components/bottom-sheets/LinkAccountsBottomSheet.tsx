import React, { useEffect } from "react";
import { View, XStack } from "tamagui";
import { useToastController } from "@tamagui/toast";
import { useRouter } from "expo-router";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import SmsListener from "react-native-android-sms-listener";
import { useUserStore } from "data/stores/user-store";
import { useAAStore } from "data/stores/aa-store";
import { useTriggerAuthOTP, useValidateAuthOTP } from "data/api";
import { useBottomSheetBackHandler } from "hooks/use-bottom-sheet-backhandler";
import { useOTP } from "ui/controls/otp/use-otp";
import {
  CamsfinservLogoLg,
  QwarkLogoWithText,
  QwarkLogoWithTextSm,
  QwarkLogoWithTextXs,
} from "ui/assets/logos";
import { Icon } from "ui/assets/icons/adaptive";
import { BodyText, TitleText } from "ui/display/typography";
import { OTPInput } from "ui/controls/otp/OTPInput";

type LinkAccountsBottomSheetProps = {};

export const LinkAccountsBottomSheet = React.forwardRef<
  BottomSheetModal,
  LinkAccountsBottomSheetProps
>((props, ref: any) => {
  const { handleSheetPositionChange } = useBottomSheetBackHandler(ref);

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing={true}
      enableContentPanningGesture={false}
      enablePanDownToClose={false}
      handleComponent={null}
      onChange={handleSheetPositionChange}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.5}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="none"
        />
      )}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
    >
      <BottomSheetView style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
        <BottomSheetContent />
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const BottomSheetContent = () => {
  const router = useRouter();
  const toast = useToastController();
  const phone = useUserStore((store) => store.phone);
  const consentHandles = useAAStore((store) => store.consent_handles);
  const setSessionId = useAAStore((store) => store.setSessionId);

  const { triggerAuthOTP } = useTriggerAuthOTP();
  const { validateAuthOTP } = useValidateAuthOTP();

  const onVerify = () => {
    router.navigate("/(app)/account-aggregator/account-discovery");
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

  const triggerOTP = async () => {
    try {
      await triggerAuthOTP({
        consent_handle: consentHandles[0].consent_handle,
        mobile_number: phone,
      });
      console.log("OTP Triggered Successfully");
    } catch (err) {
      console.log("Error in Trigger Auth OTP", err);
      toast.show(err, {
        native: true,
      });
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
    triggerOTP();
  }, []);

  return (
    <View>
      <XStack w="100%" ai="center" jc="space-between">
        <QwarkLogoWithTextXs />
        <Icon name="chainlink" />
        <CamsfinservLogoLg />
      </XStack>

      <View mt="$5">
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

      <View my="$6">
        <OTPInput variant="bottom-sheet" {...otp} onResend={triggerOTP} />
      </View>
    </View>
  );
};
