import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
export type IconProps = {
  size?: number,
  color?: string,
};
export const XmarkCircle = ({
  size = 24,
  color = "currentColor",
}: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    color={color}
    focusable={false}
  >
    <G id="Lucide Icon" clipPath="url(#clip0_424_12996)">
      <Path
        id="Vector"
        d="M9.99984 18.3333C14.6022 18.3333 18.3332 14.6024 18.3332 10C18.3332 5.39763 14.6022 1.66667 9.99984 1.66667C5.39746 1.66667 1.6665 5.39763 1.6665 10C1.6665 14.6024 5.39746 18.3333 9.99984 18.3333Z"
        stroke="currentColor"
        strokeWidth={1.67}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_2"
        d="M12.5 7.5L7.5 12.5"
        stroke="currentColor"
        strokeWidth={1.67}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_3"
        d="M7.5 7.5L12.5 12.5"
        stroke="currentColor"
        strokeWidth={1.67}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_424_12996">
        <Rect width={20} height={20} fill="currentColor" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default XmarkCircle;
