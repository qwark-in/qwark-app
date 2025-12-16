/**
 * @name FormTextInput
 *
 * @description
 * Text input component to be used in forms
 */

/**
 * Imports
 */
// React and RN
import { ReactNode } from "react";

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { Input, View, InputProps } from "tamagui";
import { Controller, ControllerProps } from "react-hook-form";
import { BodyText, TitleText } from "../../display/typography";

// Local (e.g. this and other workspaces)

/**
 * Types and interfaces
 */
interface FormTextInputProps
  extends Omit<InputProps, "defaultValue">,
    Pick<ControllerProps, "name" | "control" | "rules"> {
  /**
   * Label for the input field
   */
  label: string;
}

/**
 * Text input field component
 * @param {FormTextInputProps} props Props for the component
 * @returns {ReactNode} React component
 */

export const FormTextInput: React.FC<FormTextInputProps> = ({
  label,
  name,
  control,
  rules,
  ...rest
}: FormTextInputProps): ReactNode => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View gap="$1" pl="$1" py="$1">
          <TitleText pl="$1">{label}</TitleText>

          <Input
            unstyled
            p="$1"
            pb="$2"
            ff="$body"
            fos="$medium"
            fow="$emphasized"
            fontVariant={["lining-nums", "tabular-nums"]}
            bbw="$px"
            bbc={error ? "$stroke/error" : "$stroke/secondary"}
            focusStyle={{
              borderBottomColor: error ? "$stroke/error" : "$stroke/primary",
            }}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...rest}
          />

          {error && <BodyText color="$text/error">{error.message || "Error"}</BodyText>}
        </View>
      )}
    />
  );
};
