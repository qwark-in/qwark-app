import { Entity } from "data/models/financial-profile";
import { useFinancialProfileStore } from "data/stores/financial-profile-store";
import { useUserStore } from "data/stores/user-store";
import { useLocalSearchParams } from "expo-router";
import { capitalize } from "helpers/capitalize";
import { ScrollView, Separator, View, YStack } from "tamagui";
import { BodyText, TitleText } from "ui/display/typography";

export default function AccountDetailsScreen() {
  const { account_number, asset_class_id } = useLocalSearchParams<{
    account_number: string;
    asset_class_id: Entity;
  }>();

  const connectedAccounts = useFinancialProfileStore((store) => store.connectedAccounts);
  const { phone } = useUserStore((s) => s);

  const accountNumberKey =
    asset_class_id === "BANK"
      ? "account_number"
      : asset_class_id === "EQUITIES"
      ? "demat_account_number"
      : "folio_number";

  const fip = connectedAccounts.find(
    (item) =>
      item.asset_class_id === asset_class_id &&
      item.accounts.some((acc) => acc.accountDetails[accountNumberKey] === account_number)
  );

  const account = fip?.accounts.find(
    (acc) => acc.accountDetails[accountNumberKey] === account_number
  );

  if (!account || !fip) {
    return (
      <View f={1} p="$5" jc="center" ai="center">
        <TitleText>Account Details Not Found!</TitleText>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ bg: "#FAFAFC", pb: "$6" }}
      stickyHeaderIndices={[0]}
      overScrollMode="never"
    >
      <View pt="$2" bg="#FFF">
        <View px="$5" pb="$3">
          <TitleText size="$large">{fip.fip_name}</TitleText>
          <BodyText mt="$1">Connected with +91-{phone}</BodyText>
        </View>
        <Separator bw={0.5} boc="#E7E7E7" />
      </View>

      <View px="$5" mt="$7">
        <TitleText>Account Details</TitleText>
        <View p="$4" bw={1} boc="#E7E7E7" br="$3" bg="#FFF" mt="$4">
          {asset_class_id === "BANK" ? (
            <YStack gap="$6">
              <View>
                <TitleText color="$text/secondary">Account Number</TitleText>
                <BodyText fow="$emphasized">
                  *{account.accountDetails.account_number.slice(-4)}
                </BodyText>
              </View>
              <View>
                <TitleText color="$text/secondary">Account Type</TitleText>
                <BodyText fow="$emphasized">
                  {capitalize(account.accountDetails.account_type)}
                </BodyText>
              </View>
            </YStack>
          ) : asset_class_id === "EQUITIES" ? (
            <YStack gap="$6">
              <View>
                <TitleText color="$text/secondary">Demat Account Number</TitleText>
                <BodyText fow="$emphasized">
                  *{account.accountDetails.demat_account_number.slice(-4)}
                </BodyText>
              </View>
              <View>
                <TitleText color="$text/secondary">Broker</TitleText>
                <BodyText fow="$emphasized">
                  {capitalize(account.accountDetails.broker)}
                </BodyText>
              </View>
            </YStack>
          ) : asset_class_id === "MF_ETF_OTHERS" ? (
            <YStack gap="$6">
              <View>
                <TitleText color="$text/secondary">Folio Number</TitleText>
                <BodyText fow="$emphasized">
                  *{account.accountDetails.folio_number.slice(-4)}
                </BodyText>
              </View>
              <View>
                <TitleText color="$text/secondary">Folio Name</TitleText>
                <BodyText fow="$emphasized">
                  {capitalize(account.accountDetails.folio_name)}
                </BodyText>
              </View>
              <View>
                <TitleText color="$text/secondary">KYC</TitleText>
                <BodyText fow="$emphasized">
                  {capitalize(account.accountDetails.kyc_status)}
                </BodyText>
              </View>
            </YStack>
          ) : null}
        </View>
      </View>
      <View px="$5" mt="$7">
        <TitleText>Holder's Details</TitleText>
        <View p="$4" bw={1} boc="#E7E7E7" br="$3" bg="#FFF" mt="$4">
          <YStack gap="$6">
            <View>
              <TitleText color="$text/secondary">Name</TitleText>
              <BodyText fow="$emphasized">{account.holderDetails.name}</BodyText>
            </View>
            <View>
              <TitleText color="$text/secondary">Email</TitleText>
              <BodyText fow="$emphasized">{account.holderDetails.email}</BodyText>
            </View>
            <View>
              <TitleText color="$text/secondary">PAN</TitleText>
              <BodyText fow="$emphasized">{account.holderDetails.pan}</BodyText>
            </View>
            <View>
              <TitleText color="$text/secondary">Nominee?</TitleText>
              <BodyText fow="$emphasized">
                {account.holderDetails.nominee ? "Added" : "Not Added"}
              </BodyText>
            </View>
            <View>
              <TitleText color="$text/secondary">Address</TitleText>
              <BodyText fow="$emphasized">{account.holderDetails.address}</BodyText>
            </View>
          </YStack>
        </View>
      </View>
    </ScrollView>
  );
}
