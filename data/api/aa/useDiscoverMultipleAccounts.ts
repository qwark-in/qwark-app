import { useCallback, useEffect } from "react";
import { useDiscoverAccounts } from "./useDiscoverAccounts";
import { useUserStore } from "data/stores/user-store";
import { useAAStore } from "data/stores/aa-store";
import { Entity } from "data/models/account-aggregator";

export const useDiscoverMultipleAccounts = () => {
  const phone = useUserStore((store) => store.phone);
  const pan = useUserStore((store) => store.pan);
  const selectedBanks = useAAStore((store) => store.selectedBanks);
  const consentHandles = useAAStore((store) => store.consent_handles);
  const sessionId = useAAStore((store) => store.session_id);
  const setDiscoveredAccounts = useAAStore(
    (store) => store.setDiscoveredAccounts
  );
  // const selectAllAccounts = useAAStore((store) => store.selectAllAccounts); //TODO: Un-comment this in production to auto-select every discovered and un-linked account
  const resetDiscoveredAccounts = useAAStore(
    (store) => store.resetDiscoveredAccounts
  );
  const { discoverAccounts, discoverAccountsIsLoading, discoverAccountsError } =
    useDiscoverAccounts();

  const discover = useCallback(
    async ({
      consent_handle,
      session_id,
      fip_id,
      asset_class_id,
    }: {
      consent_handle: string;
      session_id: string;
      fip_id: string;
      asset_class_id: Entity;
    }) => {
      try {
        const response = await discoverAccounts({
          pan,
          fip_id,
          session_id,
          consent_handle,
          mobile_number: phone,
        });

        console.log(`Discover accounts response for ${fip_id} -> `, response);
        setDiscoveredAccounts((prev) => {
          return [
            ...prev,
            {
              fip_id,
              asset_class_id,
              fip_name: response.data.fip_name,
              accounts: response.data.accounts,
            },
          ];
        });

        //TODO: Un-comment this in production to auto-select every discovered and un-linked account

        // selectAllAccounts((prev) => {
        //   return [...prev, ...accountToSelect];
        // });
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  const triggerDiscoverAccounts = () => {
    resetDiscoveredAccounts();
    selectedBanks.forEach((fip) => {
      const consent_handle = consentHandles.find(
        (handle) => handle.asset_class_id === fip.asset_class_id
      )?.consent_handle!;

      discover({
        fip_id: fip.fip_id,
        asset_class_id: fip.asset_class_id,
        consent_handle: consent_handle,
        session_id: sessionId!,
      });
    });
  };

  useEffect(() => {
    resetDiscoveredAccounts();
    selectedBanks.forEach((fip) => {
      const consent_handle = consentHandles.find(
        (handle) => handle.asset_class_id === fip.asset_class_id
      )?.consent_handle!;

      discover({
        fip_id: fip.fip_id,
        asset_class_id: fip.asset_class_id,
        consent_handle: consent_handle,
        session_id: sessionId!,
      });
    });
  }, []);

  return {
    triggerDiscoverAccounts,
    discoverAccountsIsLoading,
    discoverAccountsError,
  };
};
