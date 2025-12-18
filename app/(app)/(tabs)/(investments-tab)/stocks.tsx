import { View } from "tamagui";
// import { ActivityIndicator } from "react-native";
import { StockEmpty } from "ui/assets/illustrations";
// import { FilledButton } from "ui/controls/buttons";
import { TitleText } from "ui/display/typography";
import { useMarketStore } from "data/stores/market-store";
import { StocksAndETFsHoldingsList } from "features/investments/stocksAndETFs/components/StocksAndETFsHoldingsList";

export default function StocksAndETFsScreen() {
  const eqHoldings = useMarketStore((store) => store.eqHoldings);
  //TODO: Add after aa code is moved.
  // const { addInvestments, isLoading } = useAddInvestments();

  if (!eqHoldings) {
    return (
      <View f={1} jc="center" ai="center" px="$5" gap="$10">
        <StockEmpty />
        <TitleText ta="center" fow="$emphasized">
          Connect your Stocks & ETFs and track progress easily.
        </TitleText>

        {/* //TODO: Add after aa code is moved. */}
        {/* <FilledButton
          als="stretch"
          onPress={addInvestments}
          iconAfter={isLoading ? <ActivityIndicator color="#FFF" /> : null}
        >
          Connect Account
        </FilledButton> */}
      </View>
    );
  }

  return (
    <View f={1} bg="#FAFAFC">
      <StocksAndETFsHoldingsList />
    </View>
  );
}
