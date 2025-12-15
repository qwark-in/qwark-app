import { ColorTokens } from "tamagui";
import { IconName } from "./registry";

export type RawColor =
  | `#${string}`
  | `rgb(${string})`
  | `rgba(${string})`
  | `hsl(${string})`;

export type IconSizeProps = "sm" | "md" | "lg";

export type IconProps = {
  name: IconName;
  size?: IconSizeProps;
  color?: ColorTokens | RawColor; //Tamagui token or raw color
};
