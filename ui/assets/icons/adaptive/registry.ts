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
  "connected-accounts": icons.ConnectedAccounts,
  cross: icons.Cross,
  close: icons.Close,
  "eye-hidden": icons.EyeHidden,
  "eye-visible": icons.EyeVisible,
  logout: icons.Logout,
  filter: icons.Filter,
  plus: icons.Plus,
  profile: icons.ProfileIcon,
  settings: icons.Settings,
  shield: icons.Shield,
  search: icons.Search,
  "xmark-circle": icons.XmarkCircle,
};

export type IconName = keyof typeof iconRegistry;
