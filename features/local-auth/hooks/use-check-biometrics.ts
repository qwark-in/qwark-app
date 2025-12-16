import { useEffect, useState } from "react";
import { checkBiometrics } from "../checkBiometrics";

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
