import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
export type BankIconProps = {
  size?: number,
};
export const HdfcBankLogo = ({ size = 24 }: BankIconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    focusable={false}
  >
    <G clipPath="url(#clip0_320_259)">
      <Path d="M0 3.8147e-06H24V24H0V3.8147e-06Z" fill="#ED232A" />
      <Path
        d="M4.20073 4.20054H19.8024V19.8022H4.20073V4.20054Z"
        fill="white"
      />
      <Path
        d="M13.1995 0H10.8004V10.8035H0V13.2025H10.8004V24H13.1995V13.2025H24V10.8035H13.1995V0Z"
        fill="white"
      />
      <Path
        d="M8.40132 8.40123H15.6016V15.6016H8.40132V8.40123Z"
        fill="#004C8F"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_320_259">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default HdfcBankLogo;
