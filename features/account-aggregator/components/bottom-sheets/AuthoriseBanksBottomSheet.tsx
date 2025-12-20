import React, { useMemo, useState } from "react";
import { getTokens } from "tamagui";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { AuthoriseBanksSlider } from "../authorise-banks-slider/AuthoriseBanksSlider";
import { AuthoriseBanksSuccess } from "../authorise-banks-slider/AuthoriseBanksSuccess";
import { useBottomSheetBackHandler } from "hooks/use-bottom-sheet-backhandler";
import { useAAStore } from "data/stores/aa-store";
import { AccountType } from "data/models/account-aggregator";

type AccountToLinkType = AccountType & { isAuthorised: boolean };

export const AuthoriseBanksBottomSheet = React.forwardRef<BottomSheetModal>(
  (_, ref: any) => {
    const { handleSheetPositionChange } = useBottomSheetBackHandler(ref, {
      mode: "dismiss",
    });
    const { space } = getTokens();

    const discoveredAccounts = useAAStore((store) => store.discoveredAccounts);
    const selectedAccounts = useAAStore((store) => store.selectedAccounts);
    const [authorisedIds, setAuthorisedIds] = useState<string[]>([]);

    const baseAccounts = useMemo(() => {
      return discoveredAccounts
        .filter((item) =>
          selectedAccounts.some((account) => account.fip_id === item.fip_id)
        )
        .map((item) => ({
          fip_id: item.fip_id,
          fip_name: item.fip_name,
          asset_class_id: item.asset_class_id,
          accounts: item.accounts.filter(
            (subItem) =>
              selectedAccounts.some(
                (account) => account.account_ref_number === subItem.account_ref_number
              ) && subItem.account_link_ref === ""
          ),
        }))
        .filter((item) => item.accounts.length !== 0);
    }, [selectedAccounts, discoveredAccounts]);

    const accountsToLink: AccountToLinkType[] = baseAccounts.map((acc) => ({
      ...acc,
      isAuthorised: authorisedIds.includes(acc.fip_id),
    }));

    const isAllAuthorised = authorisedIds.length === baseAccounts.length;

    const handleAuthorise = (fip_id: string) => {
      setAuthorisedIds((prev) => [...prev, fip_id]);
    };

    return (
      <BottomSheetModal
        ref={ref}
        enableDynamicSizing={true}
        enableContentPanningGesture={false}
        handleComponent={null}
        onChange={handleSheetPositionChange}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="none"
          />
        )}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
      >
        <BottomSheetView style={{ overflow: "hidden" }}>
          {!isAllAuthorised ? (
            <AuthoriseBanksSlider
              accountsToLink={accountsToLink}
              handleAuthorise={handleAuthorise}
            />
          ) : (
            <AuthoriseBanksSuccess numberOfAccounts={accountsToLink.length} />
          )}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);
