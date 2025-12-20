import { getConsentTypeString } from './getConsentTypeString';

describe('Testing helper function -> getConsentTypeString', () => {
  it('capitalizes a single word correctly', () => {
    expect(getConsentTypeString('profile')).toBe('Profile');
  });

  it('capitalizes multiple words separated by commas', () => {
    expect(getConsentTypeString('PROFILE,TRANSACTION,SUMMARY')).toBe(
      'Profile, Transaction, Summary'
    );
  });

  it('handles mixed case input', () => {
    expect(getConsentTypeString('PrOfIlE,tRAnsAcTiOn')).toBe('Profile, Transaction');
  });

  it('handles extra spaces gracefully', () => {
    expect(getConsentTypeString('profile, transaction')).toBe('Profile, Transaction');
  });

  it('handles empty string input', () => {
    expect(getConsentTypeString('')).toBe('');
  });
});
