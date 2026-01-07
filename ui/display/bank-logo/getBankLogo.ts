import type { ComponentType } from "react";
import { BANK_LOGO_MAP } from "./registry";
import { BankPlaceholderLogo } from "./BankPlaceholderLogo";

type LogoProps = { size?: number };

export const getBankLogo = (fipId: string): ComponentType<LogoProps> => {
  if (fipId in BANK_LOGO_MAP) {
    return BANK_LOGO_MAP[fipId];
  }

  return BankPlaceholderLogo;
};
