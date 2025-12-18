import { View } from "tamagui";
import { useMarketStore } from "data/stores/market-store";
import { FdEmpty } from "ui/assets/illustrations";
import { TitleText } from "ui/display/typography";
import { FDHoldingsList } from "features/investments/fds/components/FDHoldingsList";

export default function FDScreen() {
  const fdHoldings = useMarketStore((store) => store.fdHoldings);

  if (!fdHoldings) {
    return (
      <View f={1} jc="center" ai="center" px="$5" gap="$10">
        <FdEmpty />
        <TitleText ta="center" fow="$emphasized">
          Connect your Fixed Deposits and track your savings.
        </TitleText>
      </View>
    );
  }

  return (
    <View f={1} bg="#FAFAFC">
      <FDHoldingsList />
    </View>
  );
}
