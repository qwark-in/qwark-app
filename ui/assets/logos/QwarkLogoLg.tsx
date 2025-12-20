import Svg, { Circle, Mask, G, Path } from "react-native-svg";
export const QwarkLogoLg = () => (
  <Svg width={60} height={60} viewBox="0 0 60 60" fill="none">
    <Circle
      cx={29.6593}
      cy={30.341}
      r={25.9091}
      fill="#001484"
      stroke="#001484"
      strokeWidth={2.04545}
    />
    <Mask
      id="mask0_9919_1448"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={60}
      height={60}
    >
      <Circle cx={30} cy={30} r={30} fill="#491D8B" />
    </Mask>
    <G mask="url(#mask0_9919_1448)">
      <Path
        d="M27.438 25.2271L2.04512 50.6199L8.863 57.4381L34.2559 32.0452L27.438 25.2271Z"
        fill="#B2A05C"
      />
      <Path
        d="M48.0684 1.36353L23.1821 26.2499L30.3412 33.409L55.2275 8.52262L48.0684 1.36353Z"
        fill="#B2A05C"
      />
    </G>
    <Path
      d="M24.5456 32.0454L50.1138 57.6135L56.5911 51.1363L24.5456 19.0908L6.81836 36.8181L13.2956 43.2954L24.5456 32.0454Z"
      fill="#FFE78D"
    />
  </Svg>
);
export default QwarkLogoLg;
