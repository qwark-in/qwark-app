import { authenticateAsync } from "expo-local-authentication";
import { checkBiometrics } from "./checkBiometrics";

export const authenticateWithBiometrics = async () => {
  const hasBiometric = await checkBiometrics();

  if (hasBiometric) {
    const result = await authenticateAsync({
      promptMessage: "Unlock Qwark",
      fallbackLabel: "Use Passcode",
    });

    if (!result.success) {
      switch (result.error) {
        case "user_cancel":
          console.log("Biometric authentication was cancelled by the user");
          break;
        case "lockout":
          console.log("Biometric authentication is locked out");
          break;
        default:
          console.log("Something went wrong, Biometric authentication failed");
          break;
      }
    }

    return result;
  } else {
    console.log("Biometric authentication is not available or not enrolled");
  }
};
