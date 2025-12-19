import Svg, { G, Path } from "react-native-svg";
export type IconProps = {
  size?: number,
  color?: string,
};
export const ChevronRight = ({
  size = 24,
  color = "currentColor",
}: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    color={color}
    focusable={false}
  >
    <G id="Lucide Icon">
      <Path
        id="Vector"
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default ChevronRight;
