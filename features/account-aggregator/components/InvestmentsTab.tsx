import React from "react";
import { useWindowDimensions } from "react-native";
import { View, ScrollView } from "tamagui";
import { AccountSelectionCard } from "./AccountSelectionCard";
import { useAAStore } from "data/stores/aa-store";
import { BodyText } from "ui/display/typography";

type InvestmentsTabProps = {};

export const InvestmentsTab: React.FC<InvestmentsTabProps> = () => {
  const { width } = useWindowDimensions();
  const discoveredAccounts = useAAStore((store) => store.discoveredAccounts);

  const investments = discoveredAccounts.filter(
    (account) => account.asset_class_id !== "BANK"
  );

  const totalInvestmentAccounts = investments.reduce(
    (acc, curr) => acc + curr.accounts.length,
    0
  );

  return (
    <View>
      <View px="$5" pb="$1">
        <BodyText>{totalInvestmentAccounts} accounts discovered</BodyText>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: "$5", width: width }}
        showsVerticalScrollIndicator={false}
      >
        {investments.map((account) => {
          return <AccountSelectionCard key={account.fip_id} {...account} />;
        })}
        <View my="$6">
          <View px="$4" py="$3" br="$3" bw={1} boc="$qwark/primary">
            <BodyText size="$medium">
              <BodyText size="$medium" fow="$emphasized" color="$qwark/primary">
                NOTE:
              </BodyText>{" "}
              You can only link Demat accounts that are actively used for trading and
              still holding investments within the past year.
            </BodyText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
