import Svg, { Circle, Mask, G, Path } from "react-native-svg";
export const QwarkLogo = () => (
  <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
    <Circle
      cx={15.8181}
      cy={16.1819}
      r={13.8182}
      fill="#001484"
      stroke="#001484"
      strokeWidth={1.09091}
    />
    <Mask
      id="mask0_8162_3628"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={32}
      height={32}
    >
      <Circle cx={16} cy={16} r={16} fill="#491D8B" />
    </Mask>
    <G mask="url(#mask0_8162_3628)">
      <Path
        d="M14.6333 13.4551L1.09047 26.9979L4.72668 30.6343L18.2695 17.0914L14.6333 13.4551Z"
        fill="#B2A05C"
      />
      <Path
        d="M25.6364 0.727539L12.3637 14.0003L16.1819 17.8184L29.4546 4.54572L25.6364 0.727539Z"
        fill="#B2A05C"
      />
    </G>
    <Path
      d="M13.0908 17.0907L26.7271 30.7271L30.1817 27.2725L13.0908 10.1816L3.63623 19.6362L7.09078 23.0907L13.0908 17.0907Z"
      fill="#FFE78D"
    />
  </Svg>
);
export default QwarkLogo;
