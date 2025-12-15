/**
 * @name TonalButton
 *
 * @description
 * Tonal button from Qwark Design system
 */

import { styled } from "tamagui";
import { BaseButton } from "./BaseButton";

/**
 * Tonal button (styled Tamagui Button)
 */
export const TonalButton = styled(BaseButton, {
  bg: "$cyan/10",
  boc: "$cyan/10",
  pressStyle: {},
  hoverStyle: {},
});
