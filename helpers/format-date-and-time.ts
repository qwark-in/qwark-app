import { format, isToday, isYesterday } from 'date-fns';

/**
 * Converts a datetime object into formatted string.
 * Uses the semantic words like 'Yesterday', 'Today'.
 * @param date JavaScript Datetime object to be formatted
 * @returns Formatted string
 *
 * @remarks
 * ⚠️ Make sure not to pass any future date
 */
export const formatDateAndTime = (date: Date): string => {
  if (isToday(date)) {
    return `Today, ${format(date, 'h:mm aaa')}`;
  }

  if (isYesterday(date)) {
    return `Yesterday, ${format(date, 'h:mm aaa')}`;
  }

  return `${format(date, 'dd/MM/yy, h:mm aaa')}`;
};
