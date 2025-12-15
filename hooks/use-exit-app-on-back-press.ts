import { useCallback } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export const useExitAppOnBackPress = (confirm = true) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (confirm) {
          Alert.alert('Exit App', 'Do you want to exit?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Exit', onPress: () => BackHandler.exitApp() },
          ]);
        } else {
          BackHandler.exitApp();
        }
        return true;
      };

      const backHandlerSubscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );
      return () => backHandlerSubscription.remove();
    }, [confirm])
  );
};
