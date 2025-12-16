import { hasHardwareAsync, isEnrolledAsync } from "expo-local-authentication";

export const checkBiometrics = async () => {
  const hasHardware = await hasHardwareAsync();
  const isEnrolled = await isEnrolledAsync();

  return hasHardware && isEnrolled;
};
