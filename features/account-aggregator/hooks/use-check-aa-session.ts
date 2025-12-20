import { useGetConsentDetails } from "data/api";
import { useUserStore } from "data/stores/user-store";

export const useCheckAASession = () => {
  const { phone } = useUserStore();
  const { getConsentDetails } = useGetConsentDetails();

  const checkAASession = async (consent_handle: string, session_id: string) => {
    try {
      const sessionResponse = await getConsentDetails({
        consent_handle: consent_handle,
        session_id: session_id,
        mobile_number: phone,
      });

      return sessionResponse;
    } catch (error) {
      throw error;
    }
  };

  return { checkAASession };
};
