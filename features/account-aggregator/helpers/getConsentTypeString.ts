import { capitalize } from "helpers/capitalize";

/**
 * Converts a comma-separated string of consent types into a formatted string.
 *
 * This function splits the input string by commas, trims each resulting substring,
 * capitalizes the first letter of each consent type, and then joins them back
 * together with a comma and a space.
 *
 * @param consentTypes A comma-separated list of consent types. For e.g., "PROFILE,TRANSACTION,SUMMARY".
 * @returns A formatted string with each consent type capitalized. For e.g., "Profile, Transaction, Summary".
 */

export const getConsentTypeString = (consentTypes: string): string =>
  consentTypes
    .split(",")
    .map((str) => capitalize(str.trim()))
    .join(", ");
