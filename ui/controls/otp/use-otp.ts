import { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

// TODO: Only for development purpose
const fakeConfirmOtpApiCall = (success: boolean): Promise<{ status: number; message: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({
          status: 200,
          message: 'Success',
        });
      } else {
        reject({
          status: 404,
          message: 'Not found',
        });
      }
    }, 2000);
  });
};

type useOTPProps = {
  onSuccess: () => void;
  verifyFn?: (otp: string) => Promise<any>; // TODO: This should be optional only in development. In production it should required prop
  autoVerify?: boolean;
};

export const useOTP = ({ onSuccess, verifyFn, autoVerify = true }: useOTPProps) => {
  const [code, setCode] = useState<string>('');
  const [isSubmitting, setIsSubitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleCode = (textValue: string) => {
    if (isSubmitting) return;
    const newValue = textValue.replace(/[^0-9]/g, '');
    setCode(newValue);
  };

  const reset = () => {
    setCode('');
    setIsSubitting(false);
    setIsSuccess(false);
    setIsError(false);
  };

  const verifyCode = async () => {
    if (code.length !== 6 || isSubmitting) return;

    setIsSuccess(false);
    setIsError(false);
    setIsSubitting(true);
    Keyboard.dismiss();

    try {
      if (verifyFn) {
        await verifyFn(code);
      } else {
        await fakeConfirmOtpApiCall(true); // This is only for development purpose. Remove this in production.
      }

      setIsSuccess(true);
      onSuccess();
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubitting(false);
    }
  };

  useEffect(() => {
    (async function () {
      if (autoVerify && code.length === 6) {
        await verifyCode();
      }
    })();
  }, [code, autoVerify]);

  return {
    code,
    handleCode,
    isSubmitting,
    isSuccess,
    isError,
    verifyCode,
    reset,
  };
};
