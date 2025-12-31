import { format } from "date-fns";

export const getChartData = (data): { value: number; date: string }[] => {
  return data.map((item) => {
    if ("date" in item) {
      // Daily data
      return {
        value: item.value,
        date: format(item.date, "dd MMM yyyy"),
      };
    } else if ("week" in item) {
      // Weekly data
      return {
        value: item.value,
        date: item.week,
      };
    } else if ("month" in item) {
      // Monthly data
      return {
        value: item.value,
        date: item.month,
      };
    }
    return { value: 0, date: "" };
  });
};
