import { parseISO } from "date-fns";

type DataPoint = { value: number } & (
  | { date: string }
  | { week: string }
  | { month: string }
);

type Data = DataPoint[];

export const sortChartData = (data: Data) => {
  return [...data].sort((a, b) => {
    if ("date" in a && "date" in b) {
      // daily data
      return parseISO(a.date).getTime() - parseISO(b.date).getTime();
    } else if ("week" in a && "week" in b) {
      // weekly data: format is "Aug: week-01"
      const [monthA, weekA] = a.week.split(": week-");
      const [monthB, weekB] = b.week.split(": week-");

      const dateA =
        new Date(`${monthA} 1, 2025`).getTime() +
        parseInt(weekA) * 7 * 24 * 60 * 60 * 1000;
      const dateB =
        new Date(`${monthB} 1, 2025`).getTime() +
        parseInt(weekB) * 7 * 24 * 60 * 60 * 1000;

      return dateA - dateB;
    } else if ("month" in a && "month" in b) {
      // monthly data: labels are only "Aug"
      // Convert to Date (year-sensitive ordering)
      const dateA = new Date(`${a.month} 1, 2025`).getTime();
      const dateB = new Date(`${b.month} 1, 2025`).getTime();
      return dateA - dateB;
    }
    return 0;
  });
};
