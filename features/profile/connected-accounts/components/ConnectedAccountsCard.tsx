import React from "react";
import { Pressable } from "react-native";
import { Separator, View, XStack, YStack } from "tamagui";
import { capitalize } from "helpers/capitalize";
import { Icon } from "ui/assets/icons/adaptive";
import { BodyText, TitleText } from "ui/display/typography";
import { Entity } from "data/models/financial-profile";
import { useRouter } from "expo-router";

// -------------------------
// Types
// -------------------------

type ConnectedAccountsCardProps = {
  fip_name: string;
  asset_class_id: Entity;
  accounts: {
    account_number: string;
    account_type: string;
  }[];
};

// ----------------------------
// Main Card Component
// ----------------------------
export const ConnectedAccountsCard: React.FC<ConnectedAccountsCardProps> = ({
  accounts,
  fip_name,
  asset_class_id,
}) => {
  const router = useRouter();
  const numberOfAccounts = accounts.length;

  const handlePress = (account_number: string) => {
    router.navigate({
      pathname: "/profile/account-details",
      params: { asset_class_id: asset_class_id, account_number: account_number },
    });
  };

  return (
    <View mb="$6">
      <View bw={1} br="$4" boc="$stroke/disabled">
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

        <YStack py="$2">
          {accounts.map((acc, index) => (
            <AccountItem
              key={`${acc.account_number}-${index}`}
              account_number={acc.account_number}
              account_type={acc.account_type}
              onPress={() => handlePress(acc.account_number)}
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
  account_number: string;
  account_type: string;
  onPress: () => void;
};

const AccountItem: React.FC<AccountItemProps> = ({
  account_number,
  account_type,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        borderless: false,
        foreground: true,
        color: "rgba(0,0,0,0.2)",
      }}
    >
      <XStack gap="$3" px="$4" py="$2" ai="center">
        <XStack gap="$1">
          <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
            *{account_number.slice(-4)}
          </TitleText>
          <TitleText>|</TitleText>
          <TitleText>{`${capitalize(account_type)}`}</TitleText>
        </XStack>
        <View ml="auto">
          <Icon name="chevron-right" size="sm" />
        </View>
      </XStack>
    </Pressable>
  );
};
