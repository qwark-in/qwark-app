import { createTokens } from "tamagui";

import {
  qwarkSpaceTokens,
  qwarkBaseColors,
  qwarkSemanticColors,
} from "./qwark-design-system/qwarkDesignSystem";

const zIndex = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
};

const color = {
  darkTransparent: "rgba(10,10,10,0)",

  dark1: "#050505",
  dark2: "#151515",
  dark3: "#191919",
  dark4: "#232323",
  dark5: "#282828",
  dark6: "#323232",
  dark7: "#424242",
  dark8: "#494949",
  dark9: "#545454",
  dark10: "#626262",
  dark11: "#a5a5a5",
  dark12: "#fff",

  lightTransparent: "rgba(255,255,255,0)",

  light1: "#fff",
  light2: "#f9f9f9",
  light3: "hsl(0, 0%, 97.3%)",
  light4: "hsl(0, 0%, 95.1%)",
  light5: "hsl(0, 0%, 94.0%)",
  light6: "hsl(0, 0%, 92.0%)",
  light7: "hsl(0, 0%, 89.5%)",
  light8: "hsl(0, 0%, 81.0%)",
  light9: "hsl(0, 0%, 56.1%)",
  light10: "hsl(0, 0%, 50.3%)",
  light11: "hsl(0, 0%, 42.5%)",
  light12: "hsl(0, 0%, 9.0%)",
};

export const tokens = createTokens({
  color: { ...color, ...qwarkBaseColors, ...qwarkSemanticColors },
  space: qwarkSpaceTokens,
  size: qwarkSpaceTokens,
  radius: qwarkSpaceTokens,
  zIndex,
});
