/**
 * @name FilledButton
 *
 * @description
 * Filled button from Qwark Design system
 */

import { styled } from "tamagui";
import { BaseButton } from "./BaseButton";

/**
 * Filled button (styled Base Button)
 */
export const FilledButton = styled(BaseButton, {
  color: "$qwark/white",
  bg: "$qwark/primary",
  boc: "$qwark/primary",
  pressStyle: {},
  hoverStyle: {},
});
