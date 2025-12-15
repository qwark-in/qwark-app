/**
 * @name OutlineButton
 *
 * @description
 * Outline button from Qwark Design system
 */

import { styled } from "tamagui";
import { BaseButton } from "./BaseButton";

/**
 * Outline button (styled Tamagui Button)
 */
export const OutlineButton = styled(BaseButton, {
  bg: "#FFF",
  boc: "#E7E7E7",
  pressStyle: {
    bg: "#0000001F",
  },
  hoverStyle: {
    bg: "#343A3F14",
  },
});
