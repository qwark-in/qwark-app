import { ScrollView, Separator, View, XStack } from "tamagui";
import { useFinancialProfileStore } from "data/stores/financial-profile-store";
import { BodyText, TitleText } from "ui/display/typography";
import { FilledButton } from "ui/controls/buttons";
import { CamsfinservLogo } from "ui/assets/logos";
import { ConnectedAccountsCard } from "features/profile/connected-accounts/components/ConnectedAccountsCard";

export default function LinkedInvestmentsScreen() {
  const connectedAccounts = useFinancialProfileStore((store) => store.connectedAccounts);

  const investments = connectedAccounts.filter(
    (account) => account.asset_class_id !== "BANK"
  );

  if (investments.length === 0) {
    return (
      <View f={1} jc="center" ai="center">
        <TitleText>No Data Found</TitleText>
      </View>
    );
  }

  return (
    <View f={1}>
      <ScrollView f={1} contentContainerStyle={{ px: "$5", py: "$7" }}>
        {investments.map((item) => (
          <ConnectedAccountsCard
            key={item.fip_id}
            fip_name={item.fip_name}
            accounts={item.accounts.map((acc) => ({
              account_number:
                item.asset_class_id === "EQUITIES"
                  ? acc.accountDetails.demat_account_number
                  : acc.accountDetails.folio_number,
              account_type:
                item.asset_class_id === "EQUITIES"
                  ? acc.accountDetails.broker
                  : acc.accountDetails.folio_name,
            }))}
          />
        ))}
      </ScrollView>
      <Separator bg={"#E7E7E7"} />
      <View p="$5">
        <FilledButton>Connect More Accounts</FilledButton>
        <XStack gap="$1" jc="center" mt="$3" ai="center">
          <BodyText size="$xsmall">RBI regulated Account Aggregator</BodyText>
          <CamsfinservLogo />
        </XStack>
      </View>
    </View>
  );
}
