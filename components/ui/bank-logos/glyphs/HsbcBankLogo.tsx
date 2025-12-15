import Svg, { Path } from "react-native-svg";
export type BankIconProps = {
  size?: number,
};
export const HsbcBankLogo = ({ size = 24 }: BankIconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    focusable={false}
  >
    <Path d="M15.003 4.99704H5.00885V14.9912H15.003V4.99704Z" fill="white" />
    <Path d="M20 10.0059L15.0029 4.99704V15.0029L20 10.0059Z" fill="#DB0011" />
    <Path
      d="M10.0059 10.0059L15.003 4.99704H5.00885L10.0059 10.0059Z"
      fill="#DB0011"
    />
    <Path d="M0 10.0059L5.00882 15.0029V4.99704L0 10.0059Z" fill="#DB0011" />
    <Path
      d="M10.0059 10.0059L5.00885 15.0029H15.003L10.0059 10.0059Z"
      fill="#DB0011"
    />
  </Svg>
);
export default HsbcBankLogo;
