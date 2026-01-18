import { ref } from "node:process";
import * as icons from "./glyphs";

export const iconRegistry = {
  "arrow-left": icons.ArrowLeft,
  bell: icons.Bell,
  biometrics: icons.Biometrics,
  "bank-logo-placeholder": icons.BankLogoPlaceholder,
  calendar: icons.Calendar,
  chainlink: icons.ChainLink,
  check: icons.Check,
  "chevron-left": icons.ChevronLeft,
  "chevron-right": icons.ChevronRight,
  "chevron-down": icons.ChevronDown,
  "connected-accounts": icons.ConnectedAccounts,
  cross: icons.Cross,
  close: icons.Close,
  "eye-hidden": icons.EyeHidden,
  "eye-visible": icons.EyeVisible,
  home: icons.Home,
  investments: icons.Investments,
  journey: icons.Journey,
  logout: icons.Logout,
  filter: icons.Filter,
  plus: icons.Plus,
  profile: icons.ProfileIcon,
  "profile-tab": icons.ProfileTab,
  refresh: icons.Refresh,
  settings: icons.Settings,
  shield: icons.Shield,
  search: icons.Search,
  "xmark-circle": icons.XmarkCircle,
};

export type IconName = keyof typeof iconRegistry;
