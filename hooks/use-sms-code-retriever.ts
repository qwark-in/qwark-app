import { useSmsListener } from './use-sms-listener';

export const useSmsCodeRetriever = (codeLength: number) => {
  const { lastMessage } = useSmsListener();

  if (lastMessage) {
    const codeMatch = lastMessage.match(new RegExp(`\\b\\d{${codeLength}}\\b`));
    if (!codeMatch) {
      return null;
    }
    return codeMatch[0];
  }

  return null;
};
