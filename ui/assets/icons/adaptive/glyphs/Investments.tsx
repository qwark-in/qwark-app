import Svg, { Path } from "react-native-svg";
export type IconProps = {
  size?: number,
  color?: string,
};
export const Investments = ({
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
    <Path
      d="M9 21V10.2C9 9.53726 9.53726 9 10.2 9H15M9 15H4.2C3.53726 15 3 15.5373 3 16.2V19.8C3 20.4627 3.53726 21 4.2 21H19.8C20.4627 21 21 20.4627 21 19.8V4.2C21 3.53726 20.4627 3 19.8 3H16.2C15.5373 3 15 3.53726 15 4.2V21"
      stroke="currentColor"
      strokeWidth={2.004}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Investments;
