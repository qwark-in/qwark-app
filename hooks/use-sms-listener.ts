import SmsListener from 'react-native-android-sms-listener';
import { useEffect, useState } from 'react';

export const useSmsListener = () => {
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  useEffect(() => {
    const subscription = SmsListener.addListener((message) => {
      setLastMessage(message.body);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return { lastMessage };
};
