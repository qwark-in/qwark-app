import Svg, { G, Path } from "react-native-svg";
export type IconProps = {
  size?: number,
  color?: string,
};
export const Calendar = ({ size = 24, color = "currentColor" }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    color={color}
    focusable={false}
  >
    <G id="Lucide Icon">
      <Path
        id="Vector"
        d="M4.16667 4.16837H15.8333C16.2927 4.16837 16.665 4.54072 16.665 5.00004V16.6667C16.665 17.126 16.2927 17.4984 15.8333 17.4984H4.16667C3.70735 17.4984 3.335 17.126 3.335 16.6667V5.00004C3.335 4.54072 3.70735 4.16837 4.16667 4.16837Z"
        stroke="currentColor"
        strokeWidth={1.67}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_2"
        d="M13.3334 1.66663V4.99996"
        stroke="currentColor"
        strokeWidth={1.67}
        strokeLinejoin="round"
      />
      <Path
        id="Vector_3"
        d="M6.66663 1.66663V4.99996"
        stroke="currentColor"
        strokeWidth={1.67}
        strokeLinejoin="round"
      />
      <Path
        id="Vector_4"
        d="M2.5 8.33337H17.5"
        stroke="currentColor"
        strokeWidth={1.67}
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default Calendar;
