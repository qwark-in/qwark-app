import { SelectedBankType } from "data/models/account-aggregator";
import { useAAStore } from "data/stores/aa-store";
import React from "react";
import { ScrollView, XStack } from "tamagui";
import { IconButton } from "ui/controls/buttons";
import { LabelText } from "ui/display/typography";

type SelectedBanksPillsView = {
  selectedBanks: SelectedBankType[];
};

export const SelectedBanksPillsView: React.FC<SelectedBanksPillsView> = ({
  selectedBanks,
}) => {
  const setSelectedBanks = useAAStore((store) => store.setSelectedBanks);

  const banks = selectedBanks.filter((bank) => bank.asset_class_id === "BANK");

  return banks.length ? (
    <ScrollView horizontal contentContainerStyle={{ gap: "$2", mt: "$6" }}>
      {banks.map((bank) => {
        return (
          <Pill
            key={bank.fip_id}
            fip_name={bank.fip_name}
            onRemove={() => setSelectedBanks(bank)}
          />
        );
      })}
    </ScrollView>
  ) : null;
};

type PillProps = {
  fip_name: string;
  onRemove: () => void;
};

const Pill: React.FC<PillProps> = ({ fip_name, onRemove }) => {
  return (
    <XStack
      bg="#FFF"
      boc="#E7E7E7"
      bw={1}
      br={9999}
      pl={14}
      pr={7}
      py={6}
      ai="center"
      gap="$1"
    >
      <LabelText maxWidth={100} numberOfLines={1} ellipsizeMode="tail">
        {fip_name}
      </LabelText>
      <IconButton name="cross" size="sm" onPress={onRemove} />
    </XStack>
  );
};
