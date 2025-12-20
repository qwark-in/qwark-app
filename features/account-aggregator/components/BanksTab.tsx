import React from "react";
import { useWindowDimensions } from "react-native";
import { ScrollView, View, XStack } from "tamagui";
import { AccountSelectionCard } from "./AccountSelectionCard";
import { FindOutWhyBottomSheet } from "./bottom-sheets/FindOutWhyBottomSheet";
import useCustomBottomSheetModal from "hooks/use-custom-bottom-sheet-modal";
import { useAAStore } from "data/stores/aa-store";
import { BodyText, TitleText } from "ui/display/typography";

type BanksTabProps = {};

export const BanksTab: React.FC<BanksTabProps> = () => {
  const { width } = useWindowDimensions();
  const { bottomSheetModalRef, presentBottomSheetModal } = useCustomBottomSheetModal();
  const discoveredAccounts = useAAStore((store) => store.discoveredAccounts);

  const banks = discoveredAccounts.filter((account) => account.asset_class_id === "BANK");

  const totalBankAccounts = banks.reduce((acc, curr) => acc + curr.accounts.length, 0);

  return (
    <View f={1}>
      <View px="$5" pb="$1">
        <BodyText>{totalBankAccounts} bank accounts discovered</BodyText>
      </View>
      <ScrollView
        contentContainerStyle={{ px: "$5", width: width }}
        showsVerticalScrollIndicator={false}
      >
        {banks.map((account) => {
          return <AccountSelectionCard key={account.fip_id} {...account} />;
        })}
        <XStack my="$6" gap="$1" ai="center" jc="center">
          <TitleText size="$small" color="$text/secondary">
            Couldn't find your bank?
          </TitleText>
          <TitleText size="$small" color="$text/accent" onPress={presentBottomSheetModal}>
            Find out why
          </TitleText>
        </XStack>
        <FindOutWhyBottomSheet ref={bottomSheetModalRef} />
      </ScrollView>
    </View>
  );
};
