import { useEffect, useState } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import SmsListener from 'react-native-android-sms-listener';

const SMS_FILTER = {
  box: 'inbox',
  indexFrom: 0,
  maxCount: 10,
};

type SmsMessage = {
  _id: string;
  address: string;
  body: string;
  date: number;
  [key: string]: any;
};

async function requestSmsPermissions(): Promise<boolean> {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    ]);

    return (
      granted['android.permission.READ_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.RECEIVE_SMS'] === PermissionsAndroid.RESULTS.GRANTED
    );
  } catch (err) {
    console.error('Error requesting SMS permissions:', err);
    Alert.alert('Permission Error', 'Failed to request SMS permissions.');
    return false;
  }
}

function fetchSmsMessages(filter = SMS_FILTER): Promise<SmsMessage[]> {
  return new Promise((resolve, reject) => {
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.error('SMS fetch failed:', fail);
        reject(new Error(fail));
      },
      (count, smsList) => {
        try {
          const messages: SmsMessage[] = JSON.parse(smsList);
          resolve(messages);
        } catch (e) {
          console.error('Failed to parse SMS list:', e);
          reject(e);
        }
      }
    );
  });
}

export const useSmsFetch = (filter = SMS_FILTER) => {
  const [smsList, setSmsList] = useState<SmsMessage[] | null>(null);
  const [lastMessage, setLastMessage] = useState<SmsMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let smsSubscription: any;

    const init = async () => {
      try {
        const hasPermission = await requestSmsPermissions();
        if (!hasPermission) {
          setError(new Error('SMS permissions denied'));
          setLoading(false);
          return;
        }

        // Initial SMS load
        const messages = await fetchSmsMessages(filter);
        setSmsList(messages);

        // Listen for new incoming SMS
        smsSubscription = SmsListener.addListener(async (message) => {
          // console.log('New SMS received:', message);
          try {
            const updatedMessages = await fetchSmsMessages(filter);
            setSmsList(updatedMessages);
            setLastMessage(updatedMessages[0]);
          } catch (err) {
            console.error('Failed to update SMS list:', err);
          }
        });
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    init();

    return () => {
      if (smsSubscription?.remove) {
        smsSubscription.remove();
      }
    };
  }, [filter]);

  return { smsList, lastMessage, loading, error };
};
