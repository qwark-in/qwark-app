import {
  ArrowLeft,
  Bell,
  Calendar,
  EyeHidden,
  EyeVisible,
  Check,
  XmarkCircle,
  Filter,
  Plus,
} from "./glyphs";

export const iconRegistry = {
  "arrow-left": ArrowLeft,
  bell: Bell,
  calendar: Calendar,
  "eye-hidden": EyeHidden,
  "eye-visible": EyeVisible,
  check: Check,
  filter: Filter,
  plus: Plus,
  "xmark-circle": XmarkCircle,
};

export type IconName = keyof typeof iconRegistry;
