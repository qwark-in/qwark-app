/**
 * Generates a success message based on the number of accounts being tracked.
 *
 * @param {string[]} accounts - An array of account names.
 * @returns {string} A formatted success message.
 */

export const getSuccessString = (accounts: string[]): string => {
  if (accounts.length === 0) {
    return "No Accounts Found";
  }

  if (accounts.length === 1) {
    return `You have successfully started tracking ${accounts[0]}!`;
  }

  const lastAccount = accounts[accounts.length - 1];
  const others = accounts.slice(0, -1);
  return `You have successfully started tracking ${others.join(", ")} & ${lastAccount}!`;
};
