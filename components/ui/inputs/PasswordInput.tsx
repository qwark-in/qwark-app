/**
 * @name PasswordInput
 *
 * @description
 * Input field for passwords (and other secret strings)
 */

/**
 * Imports
 */
// React and RN
import { useState, ReactNode } from 'react';
import { TextInputProps } from 'react-native';

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { Input, Text, View } from 'tamagui';
import { Controller, ControllerProps } from 'react-hook-form';

// Local (e.g. this and other workspaces)
import { IconButton } from '../buttons/IconButton';
import { EyeHidden, EyeVisible } from '@/assets';
import { LabelText } from '../typography';

/**
 * Types and interfaces
 */
interface PasswordInputProps
  extends Omit<TextInputProps, 'defaultValue'>,
    Pick<ControllerProps, 'control' | 'rules'> {
  /**
   * Label for the input field
   */
  label: string;
  /**
   * Name of the input field for the controller
   */
  name: string;
}

/**
 * Helpers
 */

/**
 * Input field for password
 * @param {PasswordInputProps} props Props to the component
 * @returns {ReactNode} React component
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  placeholder,
  control,
  rules,
}: PasswordInputProps): ReactNode => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <View gap="$1">
          <LabelText color="$gray/70">{label}</LabelText>

          <View position="relative">
            <Input
              secureTextEntry={!passwordVisible}
              p="$1"
              pb="$2"
              unstyled
              placeholder={placeholder}
              size="$small"
              ff="$body"
              bbw="$px"
              fow="$emphasized"
              bbc={error ? '$stroke/error' : '$stroke/secondary'}
              focusStyle={{
                borderBottomColor: error ? '$stroke/error' : '$stroke/primary',
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              maxLength={32}
            />
            <View mt="$2" pos="absolute" t="$0" b="$0" r="$1">
              <IconButton
                icon={passwordVisible ? EyeVisible : EyeHidden}
                onPress={() => setPasswordVisible((prev) => !prev)}
              />
            </View>
          </View>
          {error && <Text color="$text/error">{error.message || 'Error'}</Text>}
        </View>
      )}
    />
  );
};
