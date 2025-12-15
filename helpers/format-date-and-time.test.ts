import { formatDateAndTime } from './format-date-and-time';
import { advanceTo, clear } from 'jest-date-mock';

describe('formatDateAndTime', () => {
  // Freeze current time for consistent testing
  beforeAll(() => {
    advanceTo(new Date('2025-06-25T10:00:00'));
  });

  afterAll(() => {
    clear();
  });

  it('should return "Today" for today\'s date', () => {
    const date = new Date('2025-06-25T08:30:00');
    expect(formatDateAndTime(date)).toBe('Today, 8:30 am');
  });

  it('should return "Yesterday" for yesterday\'s date', () => {
    const date = new Date('2025-06-24T21:15:00');
    expect(formatDateAndTime(date)).toBe('Yesterday, 9:15 pm');
  });

  it('should return formatted date for older dates', () => {
    const date = new Date('2025-06-15T14:45:00');
    expect(formatDateAndTime(date)).toBe('15/06/25, 2:45 pm');
  });

  it('should pad minutes with zero if needed', () => {
    const date = new Date('2025-06-15T09:05:00');
    expect(formatDateAndTime(date)).toBe('15/06/25, 9:05 am');
  });

  it('should display midnight as 12:00 am', () => {
    const date = new Date('2025-06-23T00:00:00');
    expect(formatDateAndTime(date)).toBe('23/06/25, 12:00 am');
  });
});
