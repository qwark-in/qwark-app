import { format, parse } from 'date-fns';

/**
 * Converts two date strings into a readable date range string.
 *
 * If parsing fails, it returns `'Invalid date range'`.
 *
 * @param {string} fromDate - The start date string in `yyyy-MM-dd HH:mm:ss.SSS` format.
 * @param {string} toDate - The end date string in `yyyy-MM-dd HH:mm:ss.SSS` format.
 * @returns {string} A formatted string representing the date range, or an error message if parsing fails.
 *
 * @example
 * getPeriodString("2023-01-10 00:00:00.000", "2025-02-09 23:59:59.999");
 * //Returns: "10 Jan 2023 to 9 Feb 2025"
 */

export const getPeriodString = (fromDate: string, toDate: string) => {
  try {
    const formatString = 'yyyy-MM-dd HH:mm:ss.SSS';
    const from = parse(fromDate, formatString, new Date());
    const to = parse(toDate, formatString, new Date());

    const formattedFrom = format(from, 'd MMM yyyy');
    const formattedTo = format(to, 'd MMM yyyy');

    return `${formattedFrom} to ${formattedTo}`;
  } catch {
    return 'Invalid date range';
  }
};
