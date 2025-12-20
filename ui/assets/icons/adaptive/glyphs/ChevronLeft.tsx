import Svg, { G, Path } from "react-native-svg";
export type IconProps = {
  size?: number,
  color?: string,
};
export const ChevronLeft = ({
  size = 24,
  color = "currentColor",
}: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    color={color}
    focusable={false}
  >
    <G id="Lucide Icon">
      <Path
        id="Vector"
        d="M10 12L6 8L10 4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default ChevronLeft;
