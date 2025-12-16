import { OTPResend, OTPVerified, OTPVerifying } from './OTPStatusComponents';

export const renderOTPStatus = ({ isSubmitting, isSuccess, isActive, onResend }) => {
  if (!isSubmitting && !isSuccess) {
    return <OTPResend isActive={isActive} onResend={onResend} />;
  }

  if (isSubmitting) {
    return OTPVerifying();
  }
  if (isSuccess) {
    return OTPVerified();
  }
};
