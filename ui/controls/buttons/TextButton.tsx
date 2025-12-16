/**
 * @name TextButton
 *
 * @description
 * Text button from Qwark Design system
 */

import { styled } from "tamagui";
import { BaseButton } from "./BaseButton";

/**
 * Text button (styled Base Button)
 */
export const TextButton = styled(BaseButton, {
  boc: "#FFF",
  pressStyle: {
    bg: "#4589FF33",
  },
  hoverStyle: {
    bg: "#4589FF14",
  },
});
