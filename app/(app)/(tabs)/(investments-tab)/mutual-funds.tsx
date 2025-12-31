import { View } from "tamagui";
import { MutualFundsEmpty } from "ui/assets/illustrations";
import { MutualFundsHoldingsList } from "features/investments/mutualFunds/components/MutualFundsHoldingsList";
import { useMarketStore } from "data/stores/market-store";
import { TitleText } from "ui/display/typography";
import { ActivityIndicator } from "react-native";
import { useAddInvestments } from "features/account-aggregator/hooks/use-add-investments";
import { FilledButton } from "ui/controls/buttons";

export default function MutualFundsScreen() {
  const mfHoldings = useMarketStore((store) => store.mfHoldings);
  const { addInvestments, isLoading } = useAddInvestments();

  if (!mfHoldings) {
    return (
      <View f={1} jc="center" ai="center" px="$5" gap="$10">
        <MutualFundsEmpty />
        <TitleText ta="center" fow="$emphasized">
          Connect your Mutual Funds and track progress easily.
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
    <View flex={1}>
      <MutualFundsHoldingsList />
    </View>
  );
}
