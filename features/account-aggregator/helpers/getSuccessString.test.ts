import { getSuccessString } from './getSuccessString';

describe('Testing helper function -> getSuccessString', () => {
  it('should not mutate the original array', () => {
    const original = ['ICICI', 'HDFC', 'SBI'];
    const copy = [...original];
    getSuccessString(copy);
    expect(copy).toEqual(original);
  });

  it('should handle empty array gracefully', () => {
    const result = getSuccessString([]);
    expect(result).toBe('No Accounts Found');
  });

  it('should return correct string for one account', () => {
    const result = getSuccessString(['ICICI']);
    expect(result).toBe('You have successfully started tracking ICICI!');
  });

  it('should return correct string for two accounts', () => {
    const result = getSuccessString(['ICICI', 'HDFC']);
    expect(result).toBe('You have successfully started tracking ICICI & HDFC!');
  });

  it('should return correct string for multiple accounts', () => {
    const result = getSuccessString(['ICICI', 'HDFC', 'NSDL', 'SBI']);
    expect(result).toBe('You have successfully started tracking ICICI, HDFC, NSDL & SBI!');
  });
});
