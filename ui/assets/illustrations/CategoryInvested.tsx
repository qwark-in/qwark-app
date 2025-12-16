import Svg, { Rect, Path } from "react-native-svg";
export const CategoryInvested = () => (
  <Svg width={25} height={24} viewBox="0 0 25 24" fill="none">
    <Rect x={0.5} width={24} height={24} rx={12} fill="#EDF5FF" />
    <Path
      d="M12.5 7.3335V16.6668"
      stroke="#001484"
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M17.1663 12L12.4997 16.6667L7.83301 12"
      stroke="#001484"
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CategoryInvested;
