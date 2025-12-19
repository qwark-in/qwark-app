import Svg, { G, Path } from "react-native-svg";
export type IconProps = {
  size?: number,
  color?: string,
};
export const Biometrics = ({
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
        d="M2 12C2 6.5 6.5 2 12 2C13.5525 2 15.0836 2.36145 16.4721 3.05573C17.8607 3.75001 19.0685 4.75804 20 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_2"
        d="M5 19.5C5.5 18 6 15 6 12C6 11.3 6.12 10.63 6.34 10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_3"
        d="M17.29 21.02C17.41 20.42 17.72 18.72 17.79 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_4"
        d="M12.0002 10C11.4698 10 10.9611 10.2107 10.586 10.5858C10.2109 10.9609 10.0002 11.4696 10.0002 12C10.0002 13.02 9.90023 14.51 9.74023 16"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_5"
        d="M8.65039 22C8.86039 21.34 9.10039 20.68 9.22039 20"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_6"
        d="M14 13.1201C14 15.5001 14 19.5001 13 22.0001"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_7"
        d="M2 16H2.01"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_8"
        d="M21.7998 16C21.9998 14 21.9308 10.646 21.7998 10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        id="Vector_9"
        d="M9 6.79994C9.9124 6.27317 10.9474 5.99593 12.001 5.99609C13.0545 5.99626 14.0894 6.27384 15.0017 6.8009C15.9139 7.32797 16.6713 8.08594 17.1976 8.99859C17.7239 9.91124 18.0007 10.9464 18 11.9999C18 12.4699 18 13.1699 17.98 13.9999"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);
export default Biometrics;
