import { View } from "tamagui";
import { MutualFundsEmpty } from "ui/assets/illustrations";
import { MutualFundsHoldingsList } from "features/investments/mutualFunds/components/MutualFundsHoldingsList";
import { useMarketStore } from "data/stores/market-store";
import { TitleText } from "ui/display/typography";
// import { ActivityIndicator } from 'react-native';

export default function MutualFundsScreen() {
  const mfHoldings = useMarketStore((store) => store.mfHoldings);
  //TODO: Add after aa code is moved.
  // const { addInvestments, isLoading } = useAddInvestments();

  if (!mfHoldings) {
    return (
      <View f={1} jc="center" ai="center" px="$5" gap="$10">
        <MutualFundsEmpty />
        <TitleText ta="center" fow="$emphasized">
          Connect your Mutual Funds and track progress easily.
        </TitleText>
        {/* //TODO: Add after aa code is moved. */}
        {/* <FilledButton
          als="stretch"
          onPress={addInvestments}
          iconAfter={isLoading ? <ActivityIndicator /> : null}
        >
          Connect Account
        </FilledButton> */}
      </View>
    );
  }

  return (
    <View flex={1}>
      <MutualFundsHoldingsList />
    </View>
  );
}
