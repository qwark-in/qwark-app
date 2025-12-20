import { getPeriodString } from './getPeriodString';

describe('Testing helper function -> getPeriodString', () => {
  it('formats valid date strings correctly', () => {
    const from = '2023-01-10 00:00:00.000';
    const to = '2026-01-09 00:00:00.000';
    const result = getPeriodString(from, to);
    expect(result).toBe('10 Jan 2023 to 9 Jan 2026');
  });

  it('formats same date for from and to', () => {
    const from = '2024-05-01 00:00:00.000';
    const to = '2024-05-01 00:00:00.000';
    const result = getPeriodString(from, to);
    expect(result).toBe('1 May 2024 to 1 May 2024');
  });

  it('returns invalid date string when given malformed date', () => {
    const from = 'invalid-date';
    const to = '2024-01-01 00:00:00.000';
    const result = getPeriodString(from, to);
    expect(result).toBe('Invalid date range');
  });

  it('handles different time parts in the timestamp', () => {
    const from = '2023-12-31 23:59:59.999';
    const to = '2024-01-01 00:00:00.000';
    const result = getPeriodString(from, to);
    expect(result).toBe('31 Dec 2023 to 1 Jan 2024');
  });
});
