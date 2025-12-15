import { addSeconds } from 'date-fns';
/**
 * Accepts the number of seconds as input and returns a datetime object
 * signifying the instant in the future by as many seconds
 * @param seconds Number of seconds to be added to the present time
 * @returns Datetime object in the future
 */

export const getExpiryTimestamp = (seconds: number) => {
  return addSeconds(new Date(), seconds);
};
