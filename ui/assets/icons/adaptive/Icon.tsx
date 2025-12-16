import { getTokens } from "tamagui";
import { iconRegistry } from "./registry";
import { IconProps } from "./types";
import { getIconSize } from "./getIconSize";

export const Icon = ({ name, size = "lg", color = "$qwark/black" }: IconProps) => {
  const Component = iconRegistry[name];
  const { color: col } = getTokens();

  const resolvedColor = color?.startsWith("$") ? col[color].val : color;

  return <Component size={getIconSize(size)} color={resolvedColor} />;
};
