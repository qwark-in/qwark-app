/**
 * Imports
 */
// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { ColorTokens, RadioGroup, RadioGroupItemProps } from 'tamagui';

/**
 * Types and interfaces
 */
interface RadioItemProps extends RadioGroupItemProps {
  /**
   * Color string for the radio buttons
   */
  color: ColorTokens;
}

/**
 * @name RadioItem
 *
 * @description
 * Radio item to be used with RadioGroup
 */
export const RadioItem: React.FC<RadioItemProps> = ({ color, value, ...rest }) => {
  const id = `radiogroup-${value}`;
  return (
    <RadioGroup.Item id={id} value={value} boc={color} bw="$_5" w="$4_5" h="$4_5" {...rest}>
      <RadioGroup.Indicator bg={color} w="$2_5" h="$2_5" />
    </RadioGroup.Item>
  );
};
