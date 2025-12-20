import React, { useEffect, useRef } from "react";
import { NativeSyntheticEvent, Platform, TargetedEvent, TextInput } from "react-native";
import { View, Input } from "tamagui";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import { OTP_MAX_LENGTH } from "./constants";
import { renderOTPStatus } from "./renderOTPStatus";
import { BodyText } from "ui/display/typography";

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
  const InputComponent =
    Platform.OS !== "web" && variant === "bottom-sheet" ? BottomSheetTextInput : Input;

  /**
   * One stable ref per digit input
   */
  const inputRefs = useRef<Array<TextInput | null>>(
    Array.from({ length: OTP_MAX_LENGTH }, () => null)
  );

  /**
   * Derive active index from current code length
   */
  const activeIndex = Math.min(code.length, OTP_MAX_LENGTH - 1);

  /**
   * Centralized focus logic (web-safe)
   */
  useEffect(() => {
    if (!isActive || isSubmitting || isSuccess) return;
    inputRefs.current[activeIndex]?.focus();
  }, [activeIndex, isActive, isSubmitting, isSuccess]);

  /**
   * Handle digit entry / paste
   */
  const handleDigitChange = (text: string, index: number) => {
    // Allow digits only
    if (!/^\d*$/.test(text)) return;

    // Full OTP paste
    if (text.length > 1) {
      handleCode(text.slice(0, OTP_MAX_LENGTH));
      return;
    }

    const next = code.split("");
    next[index] = text;
    handleCode(next.join(""));
  };

  /**
   * Handle backspace behavior
   */
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key !== "Backspace") return;

    const next = code.split("");

    if (next[index]) {
      next[index] = "";
    } else if (index > 0) {
      next[index - 1] = "";
    }

    handleCode(next.join(""));
  };

  /**
   * Prevent focusing out-of-order inputs
   */
  const handleFocusChange = (e: NativeSyntheticEvent<TargetedEvent>, index: number) => {
    if (index !== activeIndex) {
      e.preventDefault?.();
      inputRefs.current[activeIndex]?.focus();
    }
  };

  const getBorderColor = (index: number) => {
    if (isError) return "#DA1E28";
    if (isSubmitting) return "#E7E7E7";
    if (isSuccess) return "#198038";
    if (index < code.length) return "#FDDC69";
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
              //@ts-ignore
              ref={(ref: TextInput | null) => {
                inputRefs.current[index] = ref;
              }}
              value={code[index] ?? ""}
              maxLength={1}
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
