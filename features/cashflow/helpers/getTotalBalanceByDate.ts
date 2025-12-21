import { DurationType } from "features/dashboard/types";
import {
  eachDayOfInterval,
  parseISO,
  format,
  getDate,
  differenceInMonths,
} from "date-fns";

type Input = { date: string; value: number };

const getTotalBalanceByDate = (
  data: Input[]
): {
  date: string;
  value: number;
}[] => {
  if (data.length === 0) return [];

  // Step 1: Aggregate amounts per date
  const result: Record<string, number> = {};
  data.forEach((item) => {
    const date = parseISO(item.date).toISOString().split("T")[0];
    result[date] = (result[date] || 0) + item.value;
  });

  // Step 2: Find start and end dates
  const dates = data.map((d) => parseISO(d.date));
  const startDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const endDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  // Step 3: Fill missing dates with amount 0
  const filledDates: { date: string; value: number }[] = [];
  eachDayOfInterval({ start: startDate, end: endDate }).forEach((d) => {
    const key = d.toISOString().split("T")[0];
    filledDates.push({
      date: d.toISOString(),
      value: result[key] || 0,
    });
  });

  return filledDates;
};

const getTotalBalanceByWeek = (
  data: Input[]
): {
  week: string;
  value: number;
}[] => {
  if (data.length === 0) return [];

  // Parse all dates
  const parsed = data.map((item) => ({
    ...item,
    date: parseISO(item.date),
  }));

  // Group amounts into fixed 4 buckets per month
  const result: Record<string, number> = {};

  parsed.forEach((item) => {
    const day = getDate(item.date);
    const month = format(item.date, "MMM");

    let weekNum: number;
    if (day <= 7) weekNum = 1;
    else if (day <= 14) weekNum = 2;
    else if (day <= 21) weekNum = 3;
    else weekNum = 4;

    const weekLabel = `${month}: week ${String(weekNum)}`;

    result[weekLabel] = (result[weekLabel] || 0) + item.value;
  });

  // Build final array (ensures weeks are in correct order)
  const uniqueMonths = Array.from(
    new Set(parsed.map((item) => format(item.date, "yyyy-MM")))
  );

  const output: { week: string; value: number }[] = [];

  uniqueMonths.forEach((monthKey) => {
    const monthDate = parseISO(monthKey + "-01");
    const monthLabel = format(monthDate, "MMM");

    for (let i = 1; i <= 4; i++) {
      const weekLabel = `${monthLabel}: week ${String(i)}`;
      output.push({
        week: weekLabel,
        value: result[weekLabel] || 0,
      });
    }
  });

  return output;
};

const getTotalBalanceByMonth = (
  data: Input[]
): {
  month: string; // e.g. "Aug"
  value: number;
}[] => {
  if (data.length === 0) return [];

  // Parse and group
  const grouped: Record<string, number> = {};

  data.forEach((item) => {
    const date = parseISO(item.date);
    const monthKey = format(date, "yyyy-MM"); // for ordering
    const monthLabel = format(date, "MMM"); // display label

    const key = `${monthKey}|${monthLabel}`;
    grouped[key] = (grouped[key] || 0) + item.value;
  });

  // Sort by month (chronologically)
  const sortedKeys = Object.keys(grouped).sort();

  return sortedKeys.map((key) => {
    const [_, label] = key.split("|");
    return {
      month: label,
      value: grouped[key],
    };
  });
};

const getTotalBalanceByCustomDates = (
  data: Input[]
):
  | { date: string; value: number }[]
  | { week: string; value: number }[]
  | { month: string; value: number }[] => {
  if (data.length === 0) return [];

  // Parse dates to find interval length
  const parsedDates = data.map((d) => parseISO(d.date));
  const minDate = new Date(Math.min(...parsedDates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...parsedDates.map((d) => d.getTime())));

  // Calculate interval in months
  const monthsDiff = differenceInMonths(maxDate, minDate);

  if (monthsDiff < 1) {
    // Interval under 1 month → daily data
    return getTotalBalanceByDate(data);
  } else if (monthsDiff <= 6) {
    // Interval between 1 and 6 months → weekly data
    return getTotalBalanceByWeek(data);
  } else {
    // Interval greater than 6 months → monthly data
    return getTotalBalanceByMonth(data);
  }
};

export const getDataTotalByDuration = (data: Input[], duration: DurationType) => {
  switch (duration) {
    case "1M":
      return getTotalBalanceByDate(data);

    case "3M":
    case "6M":
      return getTotalBalanceByWeek(data);

    case "1Y":
      return getTotalBalanceByMonth(data);

    default:
      return getTotalBalanceByCustomDates(data);
  }
};
