import { defaultConfig } from "@tamagui/config/v4";
import { shorthands } from "@tamagui/shorthands";
import { createTamagui } from "tamagui";
import { fonts } from "./fonts";
import { tokens } from "./tokens";
import { themes } from "./themes";

export const config = createTamagui({
  ...defaultConfig,
  shorthands,
  fonts,
  tokens,
  themes,
  settings: {
    onlyAllowShorthands: false,
  },
});

export default config;

export type Conf = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
