import Svg, { G, Mask, Rect, Path } from "react-native-svg";
export type IconProps = {
  size?: number,
  color?: string,
};
export const Filter = ({ size = 24, color = "currentColor" }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    color={color}
    focusable={false}
  >
    <G id="tune">
      <Mask
        id="mask0_21_21797"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={20}
        height={20}
      >
        <Rect id="Bounding box" width={20} height={20} fill="currentColor" />
      </Mask>
      <G mask="url(#mask0_21_21797)">
        <Path
          id="tune_2"
          d="M9.5 17V12H11V13.75H17V15.25H11V17H9.5ZM3 15.25V13.75H8V15.25H3ZM6 12.5V10.75H3V9.25H6V7.5H7.5V12.5H6ZM9 10.75V9.25H17V10.75H9ZM12 8V3H13.5V4.75H17V6.25H13.5V8H12ZM3 6.25V4.75H11V6.25H3Z"
          fill="currentColor"
        />
      </G>
    </G>
  </Svg>
);
export default Filter;
