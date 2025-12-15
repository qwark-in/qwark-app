/**
 * The package that provides an API layer to all the packages.
 *
 * @package api
 */

// Config providers
export { APIGlobalConfigProvider } from "./core/APIGlobalConfigProvider";

// API hooks
export { useGetUser, useUpdateUser } from "./user/use-user";
export { useGetOTP, useValidateOTP } from "./otp/use-otp";
export { getUser } from "./user/getUser";
export { getFinProfile } from "./user/getFinProfile";
export { createUser } from "./user/createUser";
export { updateUser } from "./user/updateUser";
export {
  createUserMock,
  getUserMock,
  updateUserMock,
} from "./user/userMockApis";

// Account aggregator APIs
export { useFetchFipList } from "./aa/useFetchFipList";
export { useFetchFipListMutation } from "./aa/useFetchFipListMutation";
export { useFIUInit } from "./aa/useFIUInit";
export { useTriggerAuthOTP } from "./aa/useTriggerAuthOTP";
export { useValidateAuthOTP } from "./aa/useValidateAuthOTP";
export { useDiscoverAccounts } from "./aa/useDiscoverAccounts";
export { useDiscoverMultipleAccounts } from "./aa/useDiscoverMultipleAccounts";
export { useLinkAccounts } from "./aa/useLinkAccounts";
export { useLinkAccountsVerify } from "./aa/useLinkAccountsVerify";
export { useGetConsentDetails } from "./aa/useGetConsentDetails";
export { useAcceptConsent } from "./aa/useAcceptConsent";

// Data fetcher APIs
export { useGetDashboardData, useGetMarketData } from "./data/hooks";
