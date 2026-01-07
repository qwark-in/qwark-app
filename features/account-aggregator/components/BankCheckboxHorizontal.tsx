import React from "react";
import { View } from "tamagui";
import { Icon } from "ui/assets/icons/adaptive";
import { Checkbox } from "ui/controls/inputs";
import { TitleText } from "ui/display/typography";
import { FipDataType, SelectedBankType } from "data/models/account-aggregator";
import { BankLogo } from "ui/display/bank-logo/BankLogo";

type BankCheckboxHorizontalProps = {
  checked: boolean;
  bank: FipDataType;
  handleSelectedBanks: (fip: SelectedBankType) => void;
};

export const BankCheckboxHorizontal: React.FC<BankCheckboxHorizontalProps> =
  React.memo(({ bank, checked, handleSelectedBanks }) => {
    const handlePress = () => {
      handleSelectedBanks(bank);
    };

    return (
      <View
        f={1}
        fd="row"
        px="$4"
        py="$4"
        gap="$3"
        ai="center"
        bw={1}
        br="$4"
        boc={checked ? "$qwark/primary" : "$stroke/disabled"}
        bg={checked ? "#4589FF1F" : "#FFF"}
        pos="relative"
        onPress={handlePress}
      >
        <BankLogo fipId={bank.fip_id} />
        <View flex={1} fd="row" ai="flex-start">
          <TitleText numberOfLines={1} ellipsizeMode="tail">
            {bank.fip_name}
          </TitleText>
        </View>
        <Checkbox checked={checked} borderHidden />
      </View>
    );
  });
