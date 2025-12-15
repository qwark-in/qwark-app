type FormatAmountFunction = (netWorth: number) => string;

/**
 * Converts a number to a formatted string that uses Indian norms
 * (Thousand-Lakh-Crores, instead of Thousand-Million-Billion).
 * @param {number} amount Number to be converted into a formatted string
 * @returns {string} Formatted string
 */
export const formatAmount: FormatAmountFunction = (amount: number): string => {
  if (amount < 0 || isNaN(amount)) return 'Invalid Networth';

  const suffixes = ['', 'K', 'L', 'Cr'];
  let index = 1;
  let initialDivisor = 1000; // For the first division

  while (amount >= initialDivisor && index < suffixes.length) {
    amount /= initialDivisor;
    index += 1;
    initialDivisor = 100; // Set 100 for subsequent divisions
  }

  return '₹' + amount.toFixed(2) + suffixes[index - 1];
};
