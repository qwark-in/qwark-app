/**
 * Capitalizes the input string (converts it to a string with the first letter in upper case,
 * and other letters in lower case).
 * @param {string} inputStr Input string
 * @returns {string} Capitalized string
 */
export const capitalize = (inputStr: string): string => {
  if (typeof inputStr !== 'string') return '';
  if (inputStr.length === 0) return '';
  return inputStr[0].toUpperCase() + inputStr.slice(1).toLowerCase();
};
