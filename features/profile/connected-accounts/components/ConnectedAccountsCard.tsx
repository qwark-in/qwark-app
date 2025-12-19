import {
  BankAccountDetailsType,
  Entity,
  HolderDetailsType,
  MFAccountDetailsType,
  StocksAccountDetailsType,
} from "data/models/financial-profile";
import { capitalize } from "helpers/capitalize";
import React from "react";
import { Pressable } from "react-native";
import { Separator, View, XStack, YStack } from "tamagui";
import { Icon } from "ui/assets/icons/adaptive";
import { BodyText, TitleText } from "ui/display/typography";

// -------------------------
// Types
// -------------------------
export type AccountDetailsType =
  | ({ type: "BANK" } & BankAccountDetailsType)
  | ({ type: "STOCKS" } & StocksAccountDetailsType)
  | ({ type: "MF" } & MFAccountDetailsType);

type ConnectedAccountsCardProps = {
  fip_id: string;
  fip_name: string;
  asset_class_id: Entity;
  accounts: {
    accountDetails: AccountDetailsType;
    holderDetails: HolderDetailsType;
  }[];
};

// ----------------------------
// Main Card Component
// ----------------------------
export const ConnectedAccountsCard: React.FC<ConnectedAccountsCardProps> = ({
  accounts,
  asset_class_id,
  fip_id,
  fip_name,
}) => {
  const numberOfAccounts = accounts.length;

  const handlePress = () => {};

  return (
    <View mb="$6">
      <View bw={1} br="$4" boc="$stroke/disabled">
        {/* Header */}
        <XStack p="$4" gap="$3" ai="center">
          <Icon name="bank-logo-placeholder" />
          <YStack>
            <TitleText>{fip_name}</TitleText>

            <BodyText>
              {numberOfAccounts} {numberOfAccounts > 1 ? "accounts" : "account"}
            </BodyText>
          </YStack>
        </XStack>

        <Separator boc="$stroke/disabled" />

        {/* List */}
        <YStack py="$2">
          {accounts.map((acc, index) => (
            <AccountItem
              key={`${acc.accountDetails.type}-${index}`}
              fip_id={fip_id}
              fip_name={fip_name}
              asset_class_id={asset_class_id}
              account={acc.accountDetails}
              holderDetails={acc.holderDetails}
              onPress={handlePress}
            />
          ))}
        </YStack>
      </View>
    </View>
  );
};

// ----------------------------
// AccountItem Component
// ----------------------------
type AccountItemProps = {
  fip_id: string;
  fip_name: string;
  asset_class_id: Entity;
  account: AccountDetailsType;
  holderDetails: HolderDetailsType;
  onPress: () => void;
};

const AccountItem: React.FC<AccountItemProps> = ({ account, holderDetails, onPress }) => {
  const handlePress = () => onPress();

  console.log(account);

  // Text rendering based on account type
  const renderAccountText = () => {
    switch (account.type) {
      case "BANK":
        return (
          <View>
            <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
              *{account.account_number.slice(-4)}
            </TitleText>
            <TitleText>|</TitleText>
            <TitleText>{`${capitalize(account.account_type)} Account`}</TitleText>
          </View>
        );

      case "STOCKS":
        return (
          <>
            <TitleText>{account.broker}</TitleText>
            <TitleText>|</TitleText>
            <TitleText>Demat {account.demat_account_number.slice(-4)}</TitleText>
          </>
        );

      case "MF":
        return (
          <>
            <TitleText>{account.folio_name}</TitleText>
            <TitleText>|</TitleText>
            <TitleText>Folio {account.folio_number.slice(-4)}</TitleText>
          </>
        );
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      android_ripple={{
        borderless: false,
        foreground: true,
        color: "rgba(0,0,0,0.2)",
      }}
    >
      <XStack gap="$3" px="$4" py="$2" ai="center">
        <XStack gap="$1">{renderAccountText()}</XStack>
        <View ml="auto">
          <Icon name="chevron-right" size="sm" />
        </View>
      </XStack>
    </Pressable>
  );
};
