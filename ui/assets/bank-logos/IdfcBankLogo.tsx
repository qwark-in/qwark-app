import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
export type BankIconProps = {
  size?: number,
};
export const IdfcBankLogo = ({ size = 24 }: BankIconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    focusable={false}
  >
    <G clipPath="url(#clip0_328_112)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 20H20V0H0V20Z"
        fill="#9D1D27"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.32916 4.32843H15.6713V15.6723H4.32867L4.32916 4.32867V4.32843ZM16.6265 3.37421L3.37349 3.37349V16.6265H16.6265V3.37397V3.37421Z"
        fill="#FEFEFE"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.54217 7.71085H14.4578V5.54218H5.54217V7.71085ZM5.54217 14.4578H7.71084V12.2892H5.54217V14.4578ZM5.54217 11.0843H11.0843V8.91567H5.54217V11.0843Z"
        fill="#FEFEFE"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_328_112">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default IdfcBankLogo;
