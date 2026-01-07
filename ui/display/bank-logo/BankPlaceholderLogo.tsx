import { Icon } from "ui/assets/icons/adaptive";

export const BankPlaceholderLogo = ({ size }: { size?: number }) => {
  const logoSize = size === 16 ? "sm" : size === 20 ? "md" : "lg";

  return <Icon name="bank-logo-placeholder" color="#6F6F6F" size={logoSize} />;
};
