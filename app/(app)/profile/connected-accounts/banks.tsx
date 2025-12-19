import { ScrollView, Separator, View, XStack } from "tamagui";
import { BodyText, TitleText } from "ui/display/typography";
import { useFinancialProfileStore } from "data/stores/financial-profile-store";
import { FilledButton } from "ui/controls/buttons";
import { CamsfinservLogo } from "ui/assets/logos";
import { ConnectedAccountsCard } from "features/profile/connected-accounts/components/ConnectedAccountsCard";

export default function LinkedBanksScreen() {
  const connectedAccounts = useFinancialProfileStore((store) => store.connectedAccounts);

  const banks = connectedAccounts.filter((account) => account.asset_class_id === "BANK");

  if (banks.length === 0) {
    return (
      <View f={1} jc="center" ai="center">
        <TitleText>No Data Found</TitleText>
      </View>
    );
  }

  return (
    <View f={1}>
      <ScrollView f={1} contentContainerStyle={{ px: "$5", py: "$7" }}>
        {banks.map((item) => (
          <ConnectedAccountsCard
            key={item.fip_id}
            fip_id={item.fip_id}
            fip_name={item.fip_name}
            asset_class_id={item.asset_class_id}
            accounts={item.accounts} // ← IMPORTANT FIX
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
