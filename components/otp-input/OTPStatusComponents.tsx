import { Spinner, XStack } from "tamagui";

import { BodyText } from "components/ui/typography";
import { Verified } from "assets";
import { useToastController } from "@tamagui/toast";
import { OTPCountdownTimer } from "./OTPCountdownTimer";

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
    <XStack mt="$6" gap="$2">
      <Verified />
      <BodyText color="#198038">Verified successfully</BodyText>
    </XStack>
  );
};

export const OTPResend = ({ isActive, onResend }) => {
  const toast = useToastController();
  return (
    <XStack mt="$6" gap="$1">
      <BodyText color="$text/secondary">Didn't receive the OTP?</BodyText>
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
