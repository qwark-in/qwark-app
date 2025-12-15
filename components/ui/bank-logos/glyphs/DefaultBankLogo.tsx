import Svg, { Rect, Mask, G, Path } from "react-native-svg";
export type BankIconProps = {
  size?: number,
};
export const DefaultBankLogo = ({ size = 24 }: BankIconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    focusable={false}
  >
    <Rect width={20} height={20} rx={10} fill="#697077" />
    <Mask
      id="mask0_401_2"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={4}
      y={4}
      width={12}
      height={12}
    >
      <Rect x={4} y={4} width={12} height={12} fill="#D9D9D9" />
    </Mask>
    <G mask="url(#mask0_401_2)">
      <Path
        d="M6.5 12.5V9H7.5V12.5H6.5ZM9.5 12.5V9H10.5V12.5H9.5ZM5 14.5V13.5H15V14.5H5ZM12.5 12.5V9H13.5V12.5H12.5ZM5 8V7L10 4.5L15 7V8H5Z"
        fill="white"
      />
    </G>
  </Svg>
);
export default DefaultBankLogo;
