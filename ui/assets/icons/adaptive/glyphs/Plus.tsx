import Svg, { Path } from "react-native-svg";
export type IconProps = {
  size?: number,
  color?: string,
};
export const Plus = ({ size = 24, color = "currentColor" }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 21 20"
    fill="none"
    color={color}
    focusable={false}
  >
    <Path
      d="M4.66663 10H16.3333"
      stroke="currentColor"
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.5 4.16667V15.8333"
      stroke="currentColor"
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Plus;
