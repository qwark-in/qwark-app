import Svg, { Path } from "react-native-svg";
export type IconProps = {
  size?: number,
  color?: string,
};
export const ChevronDown = ({
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
    <Path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default ChevronDown;
