import { ArrowLeft, Bell, Calendar, EyeHidden, EyeVisible, Check } from "./glyphs";

export const iconRegistry = {
  "arrow-left": ArrowLeft,
  bell: Bell,
  calendar: Calendar,
  "eye-hidden": EyeHidden,
  "eye-visible": EyeVisible,
  check: Check,
};

export type IconName = keyof typeof iconRegistry;
