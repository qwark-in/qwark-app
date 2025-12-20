import React from "react";
import { Separator, View, XStack, YStack } from "tamagui";
import { capitalize } from "helpers/capitalize";
import { DiscoveryAccountsInfo } from "data/api/aa/types";
import { Entity } from "data/models/financial-profile";
import { AccountAggregatorState, useAAStore } from "data/stores/aa-store";
import { Icon } from "ui/assets/icons/adaptive";
import { Checkbox } from "ui/controls/inputs";
import { BodyText, TitleText } from "ui/display/typography";

type AccountSelectionCardProps = {
  fip_id: string;
  fip_name: string;
  asset_class_id: Entity;
  accounts: DiscoveryAccountsInfo[];
};

export const AccountSelectionCard: React.FC<AccountSelectionCardProps> = ({
  accounts,
  fip_id,
  fip_name,
  asset_class_id,
}) => {
  const selectedAccounts = useAAStore((store) => store.selectedAccounts);
  const setSelectedAccounts = useAAStore((store) => store.setSelectedAccounts);

  const numberOfSelectedAccounts = selectedAccounts.filter((item) =>
    accounts.map((item) => item.account_ref_number).includes(item.account_ref_number)
  ).length;

  const onAccountSelect = (
    selectedAccount: AccountAggregatorState["selectedAccounts"][number]
  ) => {
    setSelectedAccounts(selectedAccount);
  };

  return (
    <View mt="$6">
      <View bw={1} br="$4" boc="$stroke/disabled">
        <XStack p="$4" gap="$3" ai="center">
          <Icon name="bank-logo-placeholder" size="md" />
          <YStack jc="space-between">
            <TitleText>{fip_name}</TitleText>
            {numberOfSelectedAccounts ? (
              <BodyText>
                {numberOfSelectedAccounts}{" "}
                {numberOfSelectedAccounts > 1 ? "accounts" : "account"} selected
              </BodyText>
            ) : (
              <BodyText>select account</BodyText>
            )}
          </YStack>
        </XStack>

        <Separator boc="$stroke/disabled" />
        <YStack py="$2">
          {accounts.map((account) => (
            <AccountItem
              key={account.account_ref_number}
              fip_id={fip_id}
              fip_name={fip_name}
              asset_class_id={asset_class_id}
              account={account}
              selectedAccounts={selectedAccounts}
              onAccountSelect={onAccountSelect}
            />
          ))}
        </YStack>
      </View>
    </View>
  );
};

type AccountItemProps = Omit<AccountSelectionCardProps, "accounts"> & {
  account: DiscoveryAccountsInfo;
  selectedAccounts: AccountAggregatorState["selectedAccounts"];
  onAccountSelect: (
    selectedAccount: AccountAggregatorState["selectedAccounts"][number]
  ) => void;
};

const AccountItem: React.FC<AccountItemProps> = ({
  onAccountSelect,
  selectedAccounts,
  account,
  fip_id,
  fip_name,
  asset_class_id,
}) => {
  const handlePress = () => {
    onAccountSelect({
      account_ref_number: account.account_ref_number,
      account_type: account.account_type,
      fip_id,
      fip_name,
      asset_class_id,
    });
  };

  const isSelected = selectedAccounts.some(
    (acc) => acc.account_ref_number === account.account_ref_number
  );

  return (
    <View
      onPress={handlePress}
      style={{ height: 48 }}
      bg={isSelected ? "#4589FF1F" : "#FFF"}
      jc="center"
    >
      <XStack gap={3} px="$4" py="$2" ai="center">
        <XStack gap="$1">
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            *{account.account_number.slice(-4)}
          </TitleText>
          <TitleText>|</TitleText>
          <TitleText>{`${capitalize(account.account_type)} Account`}</TitleText>
        </XStack>
        <View ml="auto">
          <Checkbox checked={isSelected} />
        </View>
      </XStack>
    </View>
  );
};
