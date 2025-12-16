import { IconSizeProps } from "./types";

const ICON_SIZE_MAP: Record<IconSizeProps, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const getIconSize = (size: IconSizeProps) => ICON_SIZE_MAP[size];
