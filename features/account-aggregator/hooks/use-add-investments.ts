import { useRouter } from "expo-router";
import { useInit } from "./useInit";
import { useAAStore } from "data/stores/aa-store";
import { useCheckAASession } from "./use-check-aa-session";
import { useFetchFipListMutation } from "data/api";

export const useAddInvestments = () => {
  const router = useRouter();
  const { init, isLoading } = useInit();
  const session_id = useAAStore((store) => store.session_id);
  const { checkAASession } = useCheckAASession();
  const { fetchFipListTigger, fetchFipListIsLoading } = useFetchFipListMutation();
  const setSelectedEntities = useAAStore((store) => store.setSelectedEntities);

  const addInvestments = async () => {
    setSelectedEntities(["EQUITIES", "MF_ETF_OTHERS"]);
    try {
      const response = await init();
      if (session_id) {
        try {
          const respose = await checkAASession(
            response?.consent_handles[0].consent_handle!,
            session_id
          );

          if (respose.status === "ok") {
            await fetchFipListTigger();
            router.navigate("/(app)/account-aggregator/account-discovery");
          }
        } catch (error) {
          router.navigate("/(app)/account-aggregator/create-session");
        }
      } else {
        router.navigate("/(app)/account-aggregator/create-session");
      }
    } catch (error) {
      console.log("init error");
    }
  };

  return { addInvestments, isLoading: isLoading || fetchFipListIsLoading };
};
