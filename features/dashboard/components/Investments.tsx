import { ActivityIndicator } from "react-native";
import { useAddInvestments } from "features/account-aggregator/hooks/use-add-investments";
import { View, XStack, YStack } from "tamagui";
import { TitleText } from "ui/display/typography";
import { OutlineButton } from "ui/controls/buttons";
import { Icon } from "ui/assets/icons/adaptive";
import { StocksAndETFsCard } from "./StocksAndETFsCard";
import { MutualFundsCard } from "./MutualFundsCard";

export const Investments = () => {
  const { addInvestments, isLoading } = useAddInvestments();

  return (
    <View>
      <XStack jc="space-between">
        <TitleText size="$large" fow="$emphasized">
          Investments
        </TitleText>
        <OutlineButton
          fontFamily="$label"
          fontWeight="400"
          scaleSpace={0.2}
          fontSize={12}
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
