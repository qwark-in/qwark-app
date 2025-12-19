import { PermissionsAndroid } from 'react-native';

export const requestPermissions = async () => {
  try {
    const readSmsGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_SMS);
    const receiveSmsGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
    );

    if (receiveSmsGranted && readSmsGranted) {
      return 'GRANTED';
    }

    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    ]);

    console.log(granted);

    if (
      granted[PermissionsAndroid.PERMISSIONS.READ_SMS] === PermissionsAndroid.RESULTS.DENIED &&
      granted[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] === PermissionsAndroid.RESULTS.DENIED
    ) {
      return 'DENIED';
    }

    if (
      granted[PermissionsAndroid.PERMISSIONS.READ_SMS] ===
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN &&
      granted[PermissionsAndroid.PERMISSIONS.RECEIVE_SMS] ===
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      return 'NEVER_ASK_AGAIN';
    }

    const allGranted = Object.values(granted).every(
      (res) => res === PermissionsAndroid.RESULTS.GRANTED
    );

    if (allGranted) return 'GRANTED';
  } catch (err) {
    console.error('Permission error:', err);
    return undefined;
  }
};
