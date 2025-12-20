import Svg, { Path } from "react-native-svg";
export type IconProps = {
  size?: number,
  color?: string,
};
export const Cross = ({ size = 24, color = "currentColor" }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    color={color}
    focusable={false}
  >
    <Path
      d="M13.5 4.5L4.5 13.5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.5 4.5L13.5 13.5"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Cross;
