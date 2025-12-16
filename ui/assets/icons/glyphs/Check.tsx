import Svg, { Path } from "react-native-svg";
export type IconProps = {
  size?: number,
  color?: string,
};
export const Check = ({ size = 24, color = "currentColor" }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    color={color}
    focusable={false}
  >
    <Path
      d="M10 16.4L6 12.4L7.4 11L10 13.6L16.6 7L18 8.4L10 16.4Z"
      fill="currentColor"
    />
  </Svg>
);
export default Check;
