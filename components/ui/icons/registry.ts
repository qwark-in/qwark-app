import { ArrowLeft, Bell, Calendar } from "./glyphs";

export const iconRegistry = {
  "arrow-left": ArrowLeft,
  bell: Bell,
  calendar: Calendar,
};

export type IconName = keyof typeof iconRegistry;
