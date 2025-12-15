import { formatAmount } from './format-amount';

describe('formatAmount', () => {
  it('should format numbers correctly', () => {
    expect(formatAmount(10)).toBe('₹10.00');
    expect(formatAmount(100)).toBe('₹100.00');
    expect(formatAmount(1000)).toBe('₹1.00K');
    expect(formatAmount(100000)).toBe('₹1.00L');
    expect(formatAmount(10000000)).toBe('₹1.00Cr');
    expect(formatAmount(100000000)).toBe('₹10.00Cr');
  });

  it('should handle edge cases', () => {
    expect(formatAmount(0)).toBe('₹0.00');
    expect(formatAmount(-1000)).toBe('Invalid Networth');
    expect(formatAmount(NaN)).toBe('Invalid Networth');
  });

  it('should format large numbers correctly', () => {
    expect(formatAmount(1234567890123)).toBe('₹123456.79Cr');
    expect(formatAmount(987_65_43_210)).toBe('₹987.65Cr');
  });

  it('should format small numbers correctly', () => {
    expect(formatAmount(999)).toBe('₹999.00');
    expect(formatAmount(99999)).toBe('₹100.00K');
    expect(formatAmount(9999999)).toBe('₹100.00L');
  });

  it('should format numbers with decimal places correctly', () => {
    expect(formatAmount(1234.56)).toBe('₹1.23K');
    expect(formatAmount(1234567.89)).toBe('₹12.35L');
    expect(formatAmount(1234567890.12)).toBe('₹123.46Cr');
  });
});
