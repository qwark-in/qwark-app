import { ActivityIndicator } from "react-native";
import { useAddInvestments } from "features/account-aggregator/hooks/use-add-investments";
import { View, XStack, YStack } from "tamagui";
import { BodyText, TitleText } from "ui/display/typography";
import { OutlineButton } from "ui/controls/buttons";
import { Icon } from "ui/assets/icons/adaptive";
import { StocksAndETFsCard } from "./StocksAndETFsCard";
import { MutualFundsCard } from "./MutualFundsCard";
import { useMarketStore } from "data/stores/market-store";

export const Investments = () => {
  const { addInvestments, isLoading } = useAddInvestments();

  const eqHoldings = useMarketStore((s) => s.eqHoldings);
  const mfHoldings = useMarketStore((s) => s.mfHoldings);

  if (!(eqHoldings || mfHoldings)) {
    return null;
  }

  return (
    <View>
      <XStack jc="space-between">
        <TitleText size="$large" fow="$emphasized">
          Investments
        </TitleText>
        <OutlineButton
          small
          iconAfter={isLoading ? <ActivityIndicator /> : <Icon name="plus" size="sm" />}
          onPress={addInvestments}
        >
          Add More
        </OutlineButton>
      </XStack>
      <YStack mt="$4" gap="$3">
        <StocksAndETFsCard />
        <MutualFundsCard />
      </YStack>
    </View>
  );
};
