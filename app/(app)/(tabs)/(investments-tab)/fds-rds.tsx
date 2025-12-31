import { View } from "tamagui";
import { useMarketStore } from "data/stores/market-store";
import { FdEmpty } from "ui/assets/illustrations";
import { TitleText } from "ui/display/typography";
import { FDHoldingsList } from "features/investments/fds/components/FDHoldingsList";
import { FilledButton } from "ui/controls/buttons";
import { useAddInvestments } from "features/account-aggregator/hooks/use-add-investments";
import { ActivityIndicator } from "react-native";

export default function FDScreen() {
  const fdHoldings = useMarketStore((store) => store.fdHoldings);
  const { addInvestments, isLoading } = useAddInvestments();

  if (!fdHoldings) {
    return (
      <View f={1} jc="center" ai="center" px="$5" gap="$10">
        <FdEmpty />
        <TitleText ta="center" fow="$emphasized">
          Connect your Fixed Deposits and track your savings.
        </TitleText>

        <FilledButton
          als="stretch"
          onPress={addInvestments}
          iconAfter={isLoading ? <ActivityIndicator /> : null}
        >
          Connect Account
        </FilledButton>
      </View>
    );
  }

  return (
    <View f={1} bg="#FAFAFC">
      <FDHoldingsList />
    </View>
  );
}
