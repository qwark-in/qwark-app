/**
 * @name QwarkPinInput
 *
 * @description
 * Input field for 4-digit PIN for unlocking the app
 */

/**
 * Imports
 */
// React and RN
import { useEffect, useRef, useState, ReactNode } from 'react';
import { Keyboard } from 'react-native';

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { Input, Text, View, VisuallyHidden } from 'tamagui';

// Local (e.g. this and other workspaces)
import { EyeHidden, EyeVisible } from '@/assets';
import { BodyText } from '../typography/BodyText';
import { IconButton } from '../buttons/IconButton';

/**
 * Types and interfaces
 */
type QwarkPinInputProps = {
  /**
   * State variable for storing the PIN
   */
  code: string;
  /**
   * Setter for PIN state variable
   * @param {string} value Value to be set to the PIN state variable
   * @returns {void}
   */
  setCode: (value: string) => void;
  /**
   * (Optional) State variable for error
   */
  isError?: boolean;
  /**
   * (Optional) Setter for error state variable
   * @param {boolean} value Value to be set if error to the error state variable
   * @returns {void}
   */
  setError?: (value: boolean) => void;
  /**
   * Label for the input component
   */
  label: string;
  /**
   * Switch to show the digits (or pips)
   */
  showDigits: boolean;
  /**
   * Switch to show the input to confirm the PIN
   * @default [false]
   */
  isConfirmPin?: boolean;
};

/**
 * Helpers
 */

/**
 * 4-digit PIN input component
 * @param {QwarkPinInputProps} props Params for the component
 * @returns {ReactNode} React component
 */
export const QwarkPinInput: React.FC<QwarkPinInputProps> = ({
  code,
  setCode,
  setError,
  label,
  showDigits,
  isError,
  isConfirmPin = false,
}: QwarkPinInputProps): ReactNode => {
  //monitoring input focus
  const [inputContainerIsFocused, setInputContainerIsFocused] = useState<boolean>(false);

  const [isPinVisible, setIsPinVisible] = useState<boolean>(false);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // Handle the manual dismissal of the keyboard here
      textInputRef.current?.blur();
    });

    // Cleanup the listener when the component is unmounted
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  // Number of OTP input fields
  const PIN_MAX_LENGTH = 4;

  const codeDigitsArray = new Array(PIN_MAX_LENGTH).fill(0);

  // ref for text input
  const textInputRef = useRef<Input>(null);

  const handleOnPress = () => {
    setInputContainerIsFocused(true);
    textInputRef?.current?.focus();
  };

  const handleOnBlur = () => {
    setInputContainerIsFocused(false);
  };

  const toCodeDigitInput = (_, index: number) => {
    const digit =
      (code[index] && showDigits) || isPinVisible ? code[index] : code[index] ? '•' : '';

    // formatting
    const isCurrentDigit = index <= code.length - 1;

    return (
      <View
        key={index}
        borderColor={
          isError && isConfirmPin
            ? '$stroke/error'
            : isCurrentDigit
              ? '$stroke/accentalt'
              : '$gray/30'
        }
        width="$10"
        height="$10"
        alignItems="center"
        justifyContent="center"
        borderBottomWidth={inputContainerIsFocused ? '$_5' : '$px'}
      >
        <Text
          fontSize={showDigits || isPinVisible ? '$small' : '$large'}
          textAlign="center"
          color="$qwark/black"
        >
          {digit}
        </Text>
      </View>
    );
  };

  const handleCode = (value: string) => {
    // replace any non-numeric input with an empty string
    const newValue = value.replace(/[^0-9]/g, '');
    setCode(newValue);
    if (setError) {
      setError(false);
    }
  };

  return (
    <View onPress={handleOnBlur}>
      <BodyText marginBottom="$2">{label}</BodyText>

      <View onPress={handleOnPress} flexDirection="row" alignItems="center" gap="$4">
        {codeDigitsArray.map(toCodeDigitInput)}
        {!isConfirmPin && (
          <View marginLeft="auto">
            <IconButton
              icon={isPinVisible ? EyeVisible : EyeHidden}
              onPress={() => setIsPinVisible((prev) => !prev)}
            />
          </View>
        )}
      </View>
      {isError && isConfirmPin && (
        <BodyText marginTop="$4" color="$text/error">
          Entered PIN doesn't match
        </BodyText>
      )}
      <VisuallyHidden>
        <Input
          ref={textInputRef}
          maxLength={PIN_MAX_LENGTH}
          value={code}
          onChangeText={handleCode}
          onBlur={handleOnBlur}
          borderColor="$gray/30"
          focusStyle={{ borderColor: '$gray/30' }}
          keyboardType="numeric"
          returnKeyType="done"
          textContentType="oneTimeCode"
        />
      </VisuallyHidden>
    </View>
  );
};
