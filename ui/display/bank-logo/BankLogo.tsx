import { getBankLogo } from "./getBankLogo";

type BankLogoProps = {
  fipId: string;
  size?: number;
};

export const BankLogo = ({ fipId, size = 20 }: BankLogoProps) => {
  const Logo = getBankLogo(fipId);

  return <Logo size={size} />;
};
