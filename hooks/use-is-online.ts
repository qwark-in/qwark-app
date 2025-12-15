/**
 * @name useIsOnline
 *
 * @description
 * Utility hook for checking if the device is connected to the internet (i.e. is online)
 */

/**
 * Imports
 */
// React and RN
import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

/**
 * Hook to check if the device is connected to the internet
 * @returns Boolean state variable (true for connected, false otherwise)
 */
export const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isLoading, setIsloading] = useState<boolean>(false);

  const refresh = async () => {
    setIsloading(true);
    try {
      const response = await NetInfo.refresh();

      if (typeof response.isInternetReachable === "boolean") {
        setIsOnline(response.isInternetReachable);
      }
    } catch (error) {
      console.log("Net refresh error", error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    NetInfo.fetch().then((s) => {
      if (typeof s.isInternetReachable === "boolean") {
        setIsOnline(s.isInternetReachable);
      }
    });

    const unsubscribe = NetInfo.addEventListener((s) => {
      if (typeof s.isInternetReachable === "boolean") {
        setIsOnline(s.isInternetReachable);
      }
    });

    return unsubscribe;
  }, []);

  return {
    isOnline,
    isLoading,
    refresh,
  };
};
