import { Separator, View, XStack, YStack } from "tamagui";

import { useRouter } from "expo-router";
import { EQHoldingsDataType } from "data/models/market";
import { BodyText, LabelText, TitleText } from "ui/display/typography";

type HoldingsListItemProps = EQHoldingsDataType;

export const StockAndETFsHoldingsListItem: React.FC<HoldingsListItemProps> = ({
  qty,
  companyName,
  currentValue,
  investedValue,
  lastTradedPrice,
  cagr,
}) => {
  const router = useRouter();
  const formattedCurrentValue = "₹" + Intl.NumberFormat("en-IN").format(currentValue);
  const formattedInvestedValue = "₹" + Intl.NumberFormat("en-IN").format(investedValue);
  const formattedLastTradedPrice =
    "₹" + Intl.NumberFormat("en-IN").format(lastTradedPrice);

  const handlePress = () => {
    router.navigate({
      pathname: "/investments/stock-details",
      params: {
        companyName,
      },
    });
  };

  return (
    <View
      bg="#FFF"
      bw={1}
      boc="$stroke/disabled"
      br="$3"
      p="$4"
      mb="$5"
      mx="$5"
      onPress={handlePress}
    >
      <XStack gap="$1" jc="space-between">
        <YStack gap="$_5">
          <TitleText size="$small">{companyName}</TitleText>
          <BodyText size="$xsmall" fow="$emphasized" color="$text/secondary">
            Shares{"  "}
            <LabelText size="$medium" fontVariant={["lining-nums", "tabular-nums"]}>
              {qty}
            </LabelText>
          </BodyText>
        </YStack>
        <YStack gap="$_5" ai="flex-end">
          <TitleText
            size="$small"
            fow="$emphasized"
            fontVariant={["lining-nums", "tabular-nums"]}
          >
            {formattedLastTradedPrice}
          </TitleText>
          <BodyText size="$xsmall" fow="$emphasized" color="$text/secondary">
            Last Traded Price
          </BodyText>
        </YStack>
      </XStack>

      <Separator my="$3" boc="$stroke/disabled" />

      <XStack gap="$1" jc="space-between">
        <YStack gap="$_5">
          <BodyText size="$small" fow="$emphasized" color="$text/secondary">
            Current
          </BodyText>
          <TitleText size="$small" fontVariant={["lining-nums", "tabular-nums"]}>
            {formattedCurrentValue}
          </TitleText>
        </YStack>
        <YStack gap="$_5" ai="center">
          <BodyText size="$small" fow="$emphasized" color="$text/secondary">
            Invested
          </BodyText>
          <TitleText size="$small" fontVariant={["lining-nums", "tabular-nums"]}>
            {formattedInvestedValue}
          </TitleText>
        </YStack>
        <YStack gap="$_5" ai="flex-end">
          <BodyText size="$small" fow="$emphasized" color="$text/secondary">
            CAGR
          </BodyText>
          <TitleText
            size="$small"
            fow="$emphasized"
            fontVariant={["lining-nums", "tabular-nums"]}
            color={cagr > 0 ? "$text/success" : "$text/error"}
          >
            {cagr > 0 ? "+" : "-"}
            {cagr}%
          </TitleText>
        </YStack>
      </XStack>
    </View>
  );
};
