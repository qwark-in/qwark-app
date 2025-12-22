import Svg, { Path } from "react-native-svg";
export type IconProps = {
  size?: number,
  color?: string,
};
export const Journey = ({ size = 24, color = "currentColor" }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    color={color}
    focusable={false}
  >
    <Path
      d="M7 20H17"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 20C15.5 17.5 10.8 13.6 13 10"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.5 9.39997C10.6 10.2 11.3 11.6 11.8 13.1C9.8 13.5 8.3 13.5 7 12.8C5.8 12.2 4.7 10.9 4 8.59997C6.8 8.09997 8.4 8.59997 9.5 9.39997Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.0998 6C13.3374 7.19156 12.9539 8.58615 12.9998 10C14.8998 9.9 16.2998 9.4 17.2998 8.6C18.2998 7.6 18.8998 6.3 18.9998 4C16.2998 4.1 14.9998 5 14.0998 6Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Journey;
