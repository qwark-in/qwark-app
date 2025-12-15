/**
 * @name useCountdown
 *
 * @description
 * Hook to start a countdown timer of the specified duration
 */

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { useTimer } from "react-timer-hook";

/**
 * The hook to construct a countdown timer which expires after a specified timestamp and
 * calls the given callback function
 * @param {Date} expiryTimestamp Datetime object of the instant which the timer should expire at
 * @param {function} onExpire Optional callback function that should be called after the timer expires
 * @returns {number, number, boolean, function} Elapsed(?) time, running status and a handle to restart the timer
 */
export const useCountdown = (expiryTimestamp: Date, onExpire?: () => void) => {
  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp,
    onExpire: onExpire,
  });
  return { seconds, minutes, isRunning, restart };
};
