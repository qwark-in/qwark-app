/**
 * @name MobileNumberInput
 *
 * @description
 * Input field for entering a mobile number (grouped with country code)
 */

/**
 * Imports
 */
// React and RN
import { ReactNode } from "react";

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { Input, InputProps, View, XStack } from "tamagui";
import { Controller, ControllerProps } from "react-hook-form";

// Local (e.g. this and other workspaces)
import { CrossRoundBorder } from "assets";
import { IconButton } from "../buttons/IconButton";
import { BodyText, TitleText } from "components/ui/typography";

/**
 * Types and interfaces
 */
interface MobileNumberInputProps
  extends Omit<InputProps, "defaultValue">,
    Pick<ControllerProps, "name" | "control" | "rules"> {
  /**
   * (Optional) If the clear button is shown once a phone number is entered
   */
  showDeleteButton?: boolean;
}

/**
 * Mobile number input component
 * @param {MobileNumberInputProps} props Props for the component
 * @returns {ReactNode} React component
 */
export const MobileNumberInput: React.FC<MobileNumberInputProps> = ({
  control,
  name,
  showDeleteButton = true,
  ...rest
}): ReactNode => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View gap="$1" pl="$1" py="$1">
          <TitleText pl="$1">Mobile Number</TitleText>

          <XStack gap="$2" position="relative">
            <Input
              unstyled
              color="$warmgray/90"
              defaultValue="+91"
              ff="$body"
              fos="$medium"
              fow="$emphasized"
              fontVariant={["lining-nums", "tabular-nums"]}
              p="$1"
              bbw="$px"
              bbc={error ? "$stroke/error" : "$warmgray/40"}
              disabled
            />
            <Input
              testID="mobile-input"
              unstyled
              fg={1}
              bbw="$px"
              ff="$body"
              fos="$medium"
              fow="$emphasized"
              fontVariant={["lining-nums", "tabular-nums"]}
              bbc={error ? "$stroke/error" : "$stroke/secondary"}
              maxLength={10}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              focusStyle={{
                borderBottomColor: error
                  ? "$stroke/error"
                  : "$stroke/secondary",
              }}
              keyboardType="numeric"
              {...rest}
            />
            {showDeleteButton && value.length !== 0 && (
              <View
                position="absolute"
                right="$0"
                top="$0"
                bottom="$0"
                justifyContent="center"
              >
                <IconButton
                  icon={CrossRoundBorder}
                  onPress={() => onChange("")}
                />
              </View>
            )}
          </XStack>

          {error && (
            <BodyText color="$text/error" mt="$2">
              {error.message || "Error"}
            </BodyText>
          )}
        </View>
      )}
    />
  );
};
