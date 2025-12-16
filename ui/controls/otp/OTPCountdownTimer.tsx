/**
 * @name CoundownTimer
 *
 * @description
 * Coundown Timer for OTP input screen to wait till resend option
 */

/**
 * Imports
 */
import { ReactNode } from "react";
import { View } from "tamagui";
import { useCountdown } from "hooks/use-countdown";
import { getExpiryTimestamp } from "helpers/get-expiry-timestamp";
import { BodyText } from "ui/typography";

/**
 * Types and interfaces
 */
type OTPCountdownTimerProps = {
  /**
   * Seconds to count down to
   */
  timerSeconds: number;
  /**
   * Callback function to be called after the timer expires
   * @returns {void}
   */
  onResendPress: () => void;
};

/**
 * Helpers
 */

/**
 * Countdown timer component for OTP inputs
 * @param {OTPCountdownTimerProps} props - Props for the component
 * @returns {ReactNode} - React component
 */
export const OTPCountdownTimer: React.FC<OTPCountdownTimerProps> = ({
  timerSeconds,
  onResendPress,
}: OTPCountdownTimerProps): ReactNode => {
  const { seconds, minutes, isRunning, restart } = useCountdown(
    getExpiryTimestamp(timerSeconds)
  );

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return (
    <View>
      {isRunning ? (
        <BodyText fow="$emphasized" color="$text/accent">
          {formattedMinutes}:{formattedSeconds}
        </BodyText>
      ) : (
        <BodyText
          fow="$emphasized"
          color="$text/accent"
          pressStyle={{ textDecorationLine: "underline" }}
          onPress={() => {
            onResendPress();
            restart(getExpiryTimestamp(timerSeconds));
          }}
        >
          Resend
        </BodyText>
      )}
    </View>
  );
};
