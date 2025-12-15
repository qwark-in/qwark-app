import { Name } from '@/data/models/user';

export const computeUserFullName = (nameObj: Name) => {
  return nameObj.first + ' ' + (nameObj.middle ? nameObj.middle + ' ' : '') + nameObj.last;
};
