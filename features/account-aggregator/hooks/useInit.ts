import { useToastController } from "@tamagui/toast";
import { useFIUInit } from "data/api";
import { Entity } from "data/models/account-aggregator";
import { useAAStore } from "data/stores/aa-store";
import { useUserStore } from "data/stores/user-store";

export const useInit = () => {
  const phone = useUserStore((store) => store.phone);
  const pan = useUserStore((store) => store.pan);
  const toast = useToastController();
  const selectedBanks = useAAStore((store) => store.selectedBanks);
  const setConsentHandle = useAAStore((store) => store.setConsentHandles);
  const { fiuInit, fiuInitIsLoading } = useFIUInit();
  const init = async () => {
    try {
      const initResponse = await fiuInit({
        mobile_number: phone,
        pan: pan,
        fip_ids: selectedBanks.map((bank) => bank.fip_id),
      });
      console.log(initResponse.data);

      // TODO: Fix the below shit before going to production

      const newConsentHandles = [
        ...initResponse.data.consent_handles.map((handle) => ({
          ...handle,

          asset_class_id: handle.fip_class === "BANK" ? "BANK" : ("EQUITIES" as Entity),
        })),
        {
          asset_class_id: "MF_ETF_OTHERS" as Entity,
          consent_handle: initResponse.data.consent_handles.find(
            (handle) => handle.fip_class !== "BANK"
          )?.consent_handle!,
        },
      ];

      setConsentHandle(newConsentHandles);
      return initResponse.data;
    } catch (err) {
      toast.show("Something went wrong!");
      throw err;
    }
  };
  return { init, isLoading: fiuInitIsLoading };
};
