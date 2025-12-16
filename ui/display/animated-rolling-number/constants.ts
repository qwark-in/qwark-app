export const NUMBER_ARRAY = new Array(10).fill(0);
export const COMPACT_NOTATIONS = ['Cr', 'L', 'K'];
export const DIGIT_VARIANTS: {
  [key: string]: 'dot' | 'comma' | 'sign' | 'number' | 'compact';
} = {
  '.': 'dot',
  ',': 'comma',
  '-': 'sign',
  '+': 'sign',
  '₹': 'sign',
  '0': 'number',
  '1': 'number',
  '2': 'number',
  '3': 'number',
  '4': 'number',
  '5': 'number',
  '6': 'number',
  '7': 'number',
  '8': 'number',
  '9': 'number',
  Cr: 'compact',
  L: 'compact',
  K: 'compact',
};
