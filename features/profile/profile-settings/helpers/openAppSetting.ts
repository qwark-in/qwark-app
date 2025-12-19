import { Platform, Linking } from 'react-native';

export const openAppSettings = () => {
  if (Platform.OS === 'ios') {
    // This opens your app's settings screen in iOS
    Linking.openURL('app-settings:');
  } else {
    // This opens your app's info/settings screen in Android
    Linking.openSettings();
  }
};
