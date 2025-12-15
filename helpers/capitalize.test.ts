import { capitalize } from './capitalize';

describe('capitalize', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should capitalize the first letter of a string with mixed case', () => {
    expect(capitalize('hELLO')).toBe('Hello');
  });

  it('should return an empty string when input is empty', () => {
    expect(capitalize('')).toBe('');
  });

  it('should return an empty string when input type is not string', () => {
    //@ts-expect-error
    expect(capitalize(null)).toBe('');
    //@ts-expect-error
    expect(capitalize(undefined)).toBe('');
  });
});
