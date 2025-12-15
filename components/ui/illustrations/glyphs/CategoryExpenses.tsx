import Svg, { Rect, Path } from "react-native-svg";
export const CategoryExpenses = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect width={24} height={24} rx={12} fill="#FFF1F1" />
    <Path
      d="M8.66699 8.6665H15.3337V15.3332"
      stroke="#DA1E28"
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.66699 15.3332L15.3337 8.6665"
      stroke="#DA1E28"
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CategoryExpenses;
