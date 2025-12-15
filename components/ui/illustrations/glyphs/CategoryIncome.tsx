import Svg, { Rect, Path } from "react-native-svg";
export const CategoryIncome = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect width={24} height={24} rx={12} fill="#DEFBE6" />
    <Path
      d="M15.3337 8.6665L8.66699 15.3332"
      stroke="#24A148"
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.3337 15.3332H8.66699V8.6665"
      stroke="#24A148"
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CategoryIncome;
