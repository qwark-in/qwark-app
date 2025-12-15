/**
 * @name use-otp
 *
 * @description
 * Collection of hooks to integrate the OTP services (triggering and validating the OTP)
 */

/**
 * Imports
 */
// React and RN

// Libraries

// Local (e.g. this and other workspaces)
import { useFetch } from '@/data/api/core/use-fetch';

/**
 * Types and interfaces
 */

/**
 * Helpers
 */

//////
// Get OTP
//////
type GetOTPQueryBody = {
  email: string;
  phone?: string;
  user_id: string;
};
type GetOTPQueryParams = {}; // placeholder
type GetOTPResponse = {
  status: string;
  data: {
    session_id: string;
  };
};
type GetOTPParams = {};

/**
 * Hook for triggering an OTP from the server
 * @param params N/A
 * @returns Method to dispatch the request and state variables
 */
export const useGetOTP = (params?: GetOTPParams) => {
  const { commonFetch, isLoading, data, status, error } = useFetch<GetOTPResponse>({
    url: `/otp/create`,
    method: 'POST',
  });

  // using typescript to define the input here means no mistakes can be
  // made downstream when actually using our API layer
  const getOTP = (queryParams: GetOTPQueryParams, queryBody: GetOTPQueryBody) => {
    commonFetch({ queryParams, queryBody });
  };

  return {
    getOTP,
    getOTPIsLoading: isLoading,
    getOTPData: data,
    getOTPStatus: status,
    getOTPError: error,
  };
};

//////
// Validate OTP
//////
type ValidateOTPQueryBody = {
  otp: number;
  session_id: string;
};
type ValidateOTPQueryParams = {}; // placeholder
type ValidateOTPResponse = { status: number };
type ValidateOTPParams = ValidateOTPQueryBody;

/**
 * Hook for validating the OTP with the server
 * @param params N/A
 * @returns Method to dispatch the request and state variables
 */
export const useValidateOTP = (params?: ValidateOTPParams) => {
  const { commonFetch, isLoading, data, status, error } = useFetch<ValidateOTPResponse>({
    url: `/otp/validate`,
    method: `POST`,
  });

  const validateOTP = (queryParams: ValidateOTPQueryParams, queryBody: ValidateOTPQueryBody) => {
    commonFetch({ queryParams, queryBody });
  };

  return {
    validateOTP,
    validateOTPIsLoading: isLoading,
    validateOTPData: data,
    validateOTPStatus: status,
    validateOTPError: error,
  };
};
