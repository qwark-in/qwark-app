import { Spinner, XStack } from "tamagui";

import { BodyText } from "ui/display/typography";
import { useToastController } from "@tamagui/toast";
import { OTPCountdownTimer } from "./OTPCountdownTimer";
import { Success } from "ui/assets/icons/fixed-color";

export const OTPVerifying = () => {
  return (
    <XStack mt="$6" gap="$2">
      <Spinner size="small" color="#D9D9D9" />
      <BodyText color="#6F6F6F">Verifying</BodyText>
    </XStack>
  );
};

export const OTPVerified = () => {
  return (
    <XStack mt="$6" gap="$2" ai="center">
      <Success size={24} />
      <BodyText color="#198038">Verified successfully</BodyText>
    </XStack>
  );
};

export const OTPResend = ({ isActive, onResend }) => {
  const toast = useToastController();
  return (
    <XStack mt="$6" gap="$1">
      <BodyText color="$text/secondary">Didn't receive OTP?</BodyText>
      {isActive && (
        <OTPCountdownTimer
          timerSeconds={60}
          onResendPress={() => {
            onResend();
            toast.show("OTP resent successfully");
          }}
        />
      )}
    </XStack>
  );
};
