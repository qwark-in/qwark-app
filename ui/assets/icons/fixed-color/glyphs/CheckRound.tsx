import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
export type BankIconProps = {
  size?: number,
};
export const CheckRound = ({ size = 24 }: BankIconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    focusable={false}
  >
    <G clipPath="url(#clip0_9784_1508)">
      <Path
        d="M18.3334 9.23355V10.0002C18.3324 11.7972 17.7505 13.5458 16.6745 14.9851C15.5986 16.4244 14.0862 17.4773 12.3629 17.9868C10.6396 18.4963 8.7978 18.4351 7.11214 17.8124C5.42648 17.1896 3.98729 16.0386 3.00922 14.5311C2.03114 13.0236 1.56657 11.2403 1.68481 9.44714C1.80305 7.65402 2.49775 5.94715 3.66531 4.58111C4.83288 3.21506 6.41074 2.26303 8.16357 1.867C9.91641 1.47097 11.7503 1.65216 13.3918 2.38355"
        stroke="#24A148"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 9.16634L10 11.6663L18.3333 3.33301"
        stroke="#24A148"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_9784_1508">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CheckRound;
