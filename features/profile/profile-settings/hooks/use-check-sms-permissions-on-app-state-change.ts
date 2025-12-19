import { useEffect, useRef } from "react";
import { AppState, AppStateStatus, PermissionsAndroid } from "react-native";
import { useSettigsStore } from "data/stores/settings-store";

export const useCheckSmsPermissionsOnAppStateChange = () => {
  const appState = useRef(AppState.currentState);
  const setIsSmsPermissionGranted = useSettigsStore(
    (store) => store.setIsSmsPermissionGranted
  );

  const checkSmsPermission = async () => {
    const receiveSms = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
    );
    const readSms = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_SMS
    );
    if (readSms && receiveSms) {
      setIsSmsPermissionGranted("GRANTED");
    }
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        // App has returned to the foreground — re-check permission
        checkSmsPermission();
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener("change", handleAppStateChange);
    return () => subscription.remove();
  }, []);
};
