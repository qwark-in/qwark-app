/**
 * Imports
 */
// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { View } from "tamagui";
import { Icon } from "ui/assets/icons/adaptive";

/**
 * Types and interfaces
 */
interface CheckBoxProps {
  /**
   * Default state of the checkbox
   */
  checked: boolean;
  /**
   * (Optional) Component border to be shown
   * @default [false]
   */
  borderHidden?: boolean;
}

/**
 * @name Checkbox
 *
 * @description
 * Basic checkbox component using Qwark colors
 */

/**
 * @name Checkbox
 *
 * @description Basic checkbox component using Qwark colors
 */
export const Checkbox: React.FC<CheckBoxProps> = ({ checked, borderHidden = false }) => {
  return (
    <View
      w="$5"
      h="$5"
      br="$_5"
      bw="$_5"
      boc={borderHidden ? "$colorTransparent" : "$qwark/primary"}
      jc="center"
      ai="center"
      bg={checked ? "$qwark/primary" : "$colorTransparent"}
      pointerEvents="none"
      disableClassName
    >
      {checked && (
        <View key="check-icon">
          <Icon name="check" size={borderHidden ? "md" : "lg"} color="#FFF" />
        </View>
      )}
    </View>
  );
};
