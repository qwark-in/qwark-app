/**
 * Formats a number into Indian compact currency style
 * (e.g., 1.2K, 5L, 3.4Cr).
 *
 * @param value - The numeric value to format.
 * @param fixedDecimal - Number of decimal places to show. Defaults to 1.
 * @param fixedOnlyForCompact - If true, decimals are only applied for compact units. Defaults to false.
 * @param useGrouping - Whether to include grouping separators (e.g., 1,00,000).
 * @param locales - The locale to use. Defaults to "en-IN".
 * @returns The formatted string.
 */
export function formatCompactNumber(
  value: number,
  fixedDecimal: number = 1,
  fixedOnlyForCompact: boolean = false,
  useGrouping: boolean = false,
  locales: Intl.LocalesArgument = 'en-IN'
): string {
  const absValue = Math.abs(value);

  if (absValue >= 1_00_00_000) {
    // Crores
    return (
      (value / 1_00_00_000).toLocaleString(locales, {
        maximumFractionDigits: fixedDecimal,
        minimumFractionDigits: fixedDecimal,
        useGrouping,
        currency: 'INR',
        style: 'currency',
      }) + 'Cr'
    );
  } else if (absValue >= 1_00_000) {
    // Lakhs
    return (
      (value / 1_00_000).toLocaleString(locales, {
        maximumFractionDigits: fixedDecimal,
        minimumFractionDigits: fixedDecimal,
        useGrouping,
        currency: 'INR',
        style: 'currency',
      }) + 'L'
    );
  } else if (absValue >= 1_000) {
    // Thousands
    return (
      (value / 1_000).toLocaleString(locales, {
        maximumFractionDigits: fixedDecimal,
        minimumFractionDigits: fixedDecimal,
        useGrouping,
        currency: 'INR',
        style: 'currency',
      }) + 'K'
    );
  } else {
    // Plain number
    return value.toLocaleString(locales, {
      maximumFractionDigits: fixedDecimal,
      minimumFractionDigits: fixedDecimal,
      useGrouping,
      currency: 'INR',
      style: 'currency',
    });
  }
}
