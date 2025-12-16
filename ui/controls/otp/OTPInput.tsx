import React, { useRef } from "react";
import { NativeSyntheticEvent, TargetedEvent, TextInput } from "react-native";
import { View, Input } from "tamagui";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { OTP_MAX_LENGTH } from "./constants";
import { renderOTPStatus } from "./renderOTPStatus";
import { BodyText } from "ui/typography";

type OTPInputProps = {
  code: string;
  handleCode: (text: string) => void;
  onResend: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  isActive?: boolean;
  variant?: "default" | "bottom-sheet";
};

export const OTPInput: React.FC<OTPInputProps> = ({
  code,
  handleCode,
  onResend,
  isSubmitting,
  isSuccess,
  isError,
  isActive = true,
  variant = "default",
}) => {
  const InputComponent = variant === "bottom-sheet" ? BottomSheetTextInput : Input;
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleDigitChange = (text: string, index: number) => {
    if (code.length === OTP_MAX_LENGTH) {
      return;
    }

    // Pasted full OTP case
    if (text.length > 1 && /^\d+$/.test(text)) {
      const digits = text.slice(0, OTP_MAX_LENGTH).split("");
      handleCode(digits.join(""));

      // Focus the last filled input
      const nextIndex = Math.min(digits.length, OTP_MAX_LENGTH) - 1;
      inputsRef.current[nextIndex]?.focus();
      return;
    }

    // Regular single-digit entry
    if (!/^\d?$/.test(text)) return;

    const newCode = code.split("");
    newCode[index] = text;
    handleCode(newCode.join(""));

    // Focus next input only if input was added
    if (text && index < OTP_MAX_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    const isBackspace = e.nativeEvent.key === "Backspace";

    if (isBackspace) {
      const currentChar = code[index];
      const newCode = code.split("");

      if (currentChar) {
        // Clear current character first (no jump)
        newCode[index] = "";
        handleCode(newCode.join(""));
      } else if (index > 0) {
        // Move back if already empty
        newCode[index - 1] = "";
        handleCode(newCode.join(""));
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handleFocusChange = (e: NativeSyntheticEvent<TargetedEvent>, index: number) => {
    e.preventDefault();
    const activeIndex = code.length;

    if (activeIndex === OTP_MAX_LENGTH) {
      inputsRef.current[activeIndex - 1]?.focus();
      return;
    }

    if (index !== activeIndex) {
      inputsRef.current[activeIndex]?.focus();
    }
  };

  const getBorderColor = (index: number) => {
    if (isError) return "#DA1E28";
    if (isSubmitting) return "#E7E7E7";
    if (isSuccess) return "#198038";
    if (index < code.length) return "#FDDC69"; // current digit
    return "#C6C6C6";
  };

  return (
    <View als="center" w="100%">
      <View fd="row" jc="space-between" px="$1" w="100%">
        {Array.from({ length: OTP_MAX_LENGTH }).map((_, index) => (
          <View
            key={index}
            w="$10"
            h="$12"
            ai="center"
            jc="center"
            bbw={2}
            boc={getBorderColor(index)}
          >
            <InputComponent
              // @ts-ignore
              ref={(ref: TextInput | null) => (inputsRef.current[index] = ref)}
              value={code[index] || ""}
              maxLength={index === OTP_MAX_LENGTH - 1 ? 1 : OTP_MAX_LENGTH}
              onChangeText={(text) => handleDigitChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={(e) => handleFocusChange(e, index)}
              keyboardType="numeric"
              textAlign="center"
              color={isSubmitting ? "#ADA8A8" : "#262626"}
              editable={!isSubmitting && !isSuccess}
              backgroundColor="transparent"
              borderWidth={0}
              height="100%"
              width="100%"
              selectionColor="#FDDC69"
              style={{
                fontSize: 20,
                fontFamily: "BarlowMedium",
              }}
            />
          </View>
        ))}
      </View>

      {isError && (
        <BodyText mt="$4" color="#DA1E28">
          Please enter the correct OTP
        </BodyText>
      )}

      {renderOTPStatus({ isSubmitting, isSuccess, isActive, onResend })}
    </View>
  );
};
