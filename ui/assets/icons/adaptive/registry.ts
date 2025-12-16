import {
  ArrowLeft,
  Bell,
  Calendar,
  EyeHidden,
  EyeVisible,
  Check,
  XmarkCircle,
} from "./glyphs";

export const iconRegistry = {
  "arrow-left": ArrowLeft,
  bell: Bell,
  calendar: Calendar,
  "eye-hidden": EyeHidden,
  "eye-visible": EyeVisible,
  check: Check,
  "xmark-circle": XmarkCircle,
};

export type IconName = keyof typeof iconRegistry;
