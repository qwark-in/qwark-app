import { useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import { useSettigsStore } from "data/stores/settings-store";
import { requestPermissions } from "../helpers";

export const useRequestSmsPermissions = () => {
  const isSmsPermissionGranted = useSettigsStore((store) => store.isSmsPermissionGranted);
  const setIsSmsPermissionGranted = useSettigsStore(
    (store) => store.setIsSmsPermissionGranted
  );

  useEffect(() => {
    const request = async () => {
      const result = await requestPermissions();
      if (result) {
        setIsSmsPermissionGranted(result);
      }
    };
    if (!isSmsPermissionGranted) {
      request();
    } else {
      (async function () {
        const readSmsGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_SMS
        );
        const receiveSmsGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
        );

        if (readSmsGranted && receiveSmsGranted) {
          setIsSmsPermissionGranted("GRANTED");
        } else {
          setIsSmsPermissionGranted("DENIED");
        }
      })();
    }
  }, []);
};
