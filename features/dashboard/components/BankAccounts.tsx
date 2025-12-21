import { useRouter } from "expo-router";
import { View, XStack } from "tamagui";
import { BankAccountsList } from "./BankAccountsList";
import { useAAStore } from "data/stores/aa-store";
import { useDashboardStore } from "data/stores/dashboard-store";
import { TitleText } from "ui/display/typography";
import { OutlineButton } from "ui/controls/buttons";
import { Icon } from "ui/assets/icons/adaptive";

export const BankAccounts = () => {
  const cashflow = useDashboardStore((store) => store.cashflow);
  const setSelectedEntities = useAAStore((store) => store.setSelectedEntities);
  const router = useRouter();

  const handlePress = () => {
    setSelectedEntities(["BANK"]);
    router.navigate("/(app)/account-aggregator/select-banks");
  };

  if (!cashflow) {
    return (
      <View>
        <TitleText>Data Not Avaialble</TitleText>
      </View>
    );
  }

  return (
    <View>
      <XStack jc="space-between">
        <TitleText size="$large" fow="$emphasized">
          Bank Accounts
        </TitleText>
        <OutlineButton
          fontFamily="$label"
          fontWeight="400"
          scaleSpace={0.2}
          fontSize={12}
          iconAfter={<Icon name="plus" size="md" />}
          onPress={handlePress}
        >
          Add More
        </OutlineButton>
      </XStack>
      <BankAccountsList cashflow={cashflow} />
    </View>
  );
};
