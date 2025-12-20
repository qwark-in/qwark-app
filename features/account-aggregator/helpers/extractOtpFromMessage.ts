function containsAllWords(message: string, fip_name: string): boolean {
  const words = fip_name.toLowerCase().split(/\s+/);
  const msg = message.toLowerCase();
  return words.every((word) => msg.includes(word));
}

const investmentFipsMap = {
  'National Securities Depository Limited': 'NSDL',
  'Central Depository Services Limited': 'CDSL',
  'CAMS RTA': 'CAMS',
  'Kfin Technologies Limited (Mutual Fund)': 'KFintech',
} as const;

function isInvestmentFip(message: string, fip_name: string): boolean {
  if (!Object.keys(investmentFipsMap).includes(fip_name)) {
    return false;
  }

  return message.toLowerCase().includes(investmentFipsMap[fip_name]?.toLowerCase());
}

export const extractOtpFromMessage = (message: string, fip_name: string): string | null => {
  // Step 1: Check if FIP words exist in message
  if (!containsAllWords(message, fip_name) && !isInvestmentFip(message, fip_name)) {
    return null;
  }

  // Step 2: Try to extract OTP (6 digit number)
  const match = message.match(/(?<!\d)\d{6}(?!\d)/);
  if (match) {
    console.log(match[0], fip_name);
  }
  return match ? match[0] : null;
};
