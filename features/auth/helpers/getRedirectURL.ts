import { Platform } from 'react-native';
import Constants from 'expo-constants';

const scheme = Constants.expoConfig?.scheme ?? 'exp+qwark';
const ANDROID_REDIRECT_URL = `${scheme}://login`;
const IOS_REDIRECT_URL = ''; // TODO
const WEB_REDIRECT_URL = ''; // TODO

export const getRedirectURL = () => {
  switch (Platform.OS) {
    case 'android':
      return ANDROID_REDIRECT_URL;
    case 'ios':
      return IOS_REDIRECT_URL;
    case 'web':
      return WEB_REDIRECT_URL;
    default:
      console.error('Qwark app getting installed on an unsupported platform, something is wrong.');
      throw new Error('Qwark: Unsupported platform');
  }
};
