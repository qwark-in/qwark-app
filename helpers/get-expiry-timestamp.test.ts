import { getExpiryTimestamp } from './get-expiry-timestamp';
import { advanceTo, clear } from 'jest-date-mock';

describe('getExpiryTimestamp', () => {
  beforeAll(() => {
    // Freeze current time for consistent testing
    advanceTo(new Date('2025-06-25T10:00:00Z'));
  });

  afterAll(() => {
    clear();
  });

  it('should return a date exactly X seconds from now', () => {
    const result60 = getExpiryTimestamp(60); // 60 seconds
    expect(result60.toISOString()).toBe('2025-06-25T10:01:00.000Z');

    const result120 = getExpiryTimestamp(120); // 120 seconds
    expect(result120.toISOString()).toBe('2025-06-25T10:02:00.000Z');

    const result300 = getExpiryTimestamp(300); // 120 seconds
    expect(result300.toISOString()).toBe('2025-06-25T10:05:00.000Z');
  });

  it('should handle zero seconds', () => {
    const result = getExpiryTimestamp(0);
    expect(result.toISOString()).toBe('2025-06-25T10:00:00.000Z');
  });

  it('should handle negative seconds', () => {
    const result = getExpiryTimestamp(-30);
    expect(result.toISOString()).toBe('2025-06-25T09:59:30.000Z');
  });
});
