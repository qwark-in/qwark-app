import { differenceInMonths, parseISO } from 'date-fns';
const pointerLabelWidthMap = {
  '1M': 165,
  '3M': 175,
  '6M': 175,
  '1Y': 95,
};

export const getPointerLabelWidth = ({ fromDate, toDate }) => {
  // Calculate interval in months
  const monthsDiff = differenceInMonths(toDate, fromDate);

  if (monthsDiff < 1) {
    // Interval under 1 month → daily data
    return pointerLabelWidthMap['1M'];
  } else if (monthsDiff <= 6) {
    // Interval between 1 and 6 months → weekly data
    return pointerLabelWidthMap['3M'];
  } else {
    // Interval greater than 6 months → monthly data
    return pointerLabelWidthMap['1Y'];
  }
};
