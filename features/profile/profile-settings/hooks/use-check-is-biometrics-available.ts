import { checkBiometrics } from "features/local-auth/checkBiometrics";
import { useEffect, useState } from "react";

export const useCheckBiometricsAvailable = () => {
  const [isBiometricsAvailable, setIsBiometricsAvailable] = useState<Boolean>(false);
  useEffect(() => {
    (async function () {
      const hasBiometric = await checkBiometrics();
      setIsBiometricsAvailable(hasBiometric);
    })();
  }, []);

  return { isBiometricsAvailable };
};
