import { DurationType } from "features/dashboard/types";
import {
  eachDayOfInterval,
  parseISO,
  format,
  getDate,
  differenceInMonths,
} from "date-fns";

type Input = { date: string; value: number };

type Dates = { startDate: string; endDate: string };

const getTotalBalanceByDate = (
  data: Input[],
  appliedDates: Dates
): { date: string; value: number }[] => {
  const result: Record<string, number> = {};

  data.forEach((item) => {
    const key = parseISO(item.date).toISOString().split("T")[0];
    result[key] = (result[key] || 0) + item.value;
  });

  const start = parseISO(appliedDates.startDate);
  const end = parseISO(appliedDates.endDate);

  return eachDayOfInterval({ start, end }).map((d) => {
    const key = d.toISOString().split("T")[0];
    return {
      date: d.toISOString(),
      value: result[key] || 0,
    };
  });
};

const getTotalBalanceByWeek = (
  data: Input[],
  appliedDates: Dates
): { week: string; value: number }[] => {
  const result: Record<string, number> = {};

  data.forEach((item) => {
    const date = parseISO(item.date);
    const day = getDate(date);
    const monthKey = format(date, "yyyy-MM");
    const monthLabel = format(date, "MMM");

    const weekNum = day <= 7 ? 1 : day <= 14 ? 2 : day <= 21 ? 3 : 4;

    const key = `${monthKey}|${weekNum}|${monthLabel}`;
    result[key] = (result[key] || 0) + item.value;
  });

  const start = parseISO(appliedDates.startDate);
  const end = parseISO(appliedDates.endDate);

  const output: { week: string; value: number }[] = [];

  let cursor = new Date(start);

  while (cursor <= end) {
    const monthKey = format(cursor, "yyyy-MM");
    const monthLabel = format(cursor, "MMM");

    for (let week = 1; week <= 4; week++) {
      const key = `${monthKey}|${week}|${monthLabel}`;
      output.push({
        week: `${monthLabel}: week ${week}`,
        value: result[key] || 0,
      });
    }

    cursor.setMonth(cursor.getMonth() + 1);
  }

  return output;
};

const getTotalBalanceByMonth = (
  data: Input[],
  appliedDates: Dates
): { month: string; value: number }[] => {
  const result: Record<string, number> = {};

  data.forEach((item) => {
    const date = parseISO(item.date);
    const key = format(date, "yyyy-MM");
    result[key] = (result[key] || 0) + item.value;
  });

  const start = parseISO(appliedDates.startDate);
  const end = parseISO(appliedDates.endDate);

  const output: { month: string; value: number }[] = [];

  let cursor = new Date(start);
  cursor.setDate(1);

  while (cursor <= end) {
    const key = format(cursor, "yyyy-MM");
    output.push({
      month: format(cursor, "MMM yyyy"),
      value: result[key] || 0,
    });

    cursor.setMonth(cursor.getMonth() + 1);
  }

  return output;
};

const getTotalBalanceByCustomDates = (data: Input[], appliedDates: Dates) => {
  const start = parseISO(appliedDates.startDate);
  const end = parseISO(appliedDates.endDate);

  const monthsDiff = differenceInMonths(end, start);

  if (monthsDiff < 1) {
    return getTotalBalanceByDate(data, appliedDates);
  }

  if (monthsDiff <= 6) {
    return getTotalBalanceByWeek(data, appliedDates);
  }

  return getTotalBalanceByMonth(data, appliedDates);
};

export const getDataTotalByDuration = (
  data: Input[],
  duration: DurationType,
  dates: Dates
) => {
  switch (duration) {
    case "1M":
      return getTotalBalanceByDate(data, dates);

    case "3M":
    case "6M":
      return getTotalBalanceByWeek(data, dates);

    case "1Y":
      return getTotalBalanceByMonth(data, dates);

    default:
      return getTotalBalanceByCustomDates(data, dates);
  }
};
