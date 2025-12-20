import { logout } from "data/api/auth";
import {
  ArrowLeft,
  Bell,
  Biometrics,
  BankLogoPlaceholder,
  Calendar,
  ChevronRight,
  Check,
  ConnectedAccounts,
  EyeHidden,
  EyeVisible,
  Logout,
  XmarkCircle,
  Filter,
  Plus,
  ProfileIcon,
  Settings,
  Shield,
} from "./glyphs";

export const iconRegistry = {
  "arrow-left": ArrowLeft,
  bell: Bell,
  biometrics: Biometrics,
  "bank-logo-placeholder": BankLogoPlaceholder,
  calendar: Calendar,
  check: Check,
  "chevron-right": ChevronRight,
  "connected-accounts": ConnectedAccounts,
  "eye-hidden": EyeHidden,
  "eye-visible": EyeVisible,
  logout: Logout,
  filter: Filter,
  plus: Plus,
  profile: ProfileIcon,
  settings: Settings,
  shield: Shield,
  "xmark-circle": XmarkCircle,
};

export type IconName = keyof typeof iconRegistry;
