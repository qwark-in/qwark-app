import { Separator, View, XStack, YStack } from "tamagui";
import { useRouter } from "expo-router";
import { format } from "date-fns";
import { BodyText, TitleText } from "ui/display/typography";
import { FDHoldingsDataType } from "data/models/market";

type HoldingsListItemProps = FDHoldingsDataType;

export const FDHoldingsListItem: React.FC<HoldingsListItemProps> = ({
  accountType,
  durationInDays,
  interestRate,
  issuerName,
  maturityAmount,
  maturityDate,
  principalAmount,
  startDate,
}) => {
  const router = useRouter();
  const formattedMaturityAmount = "₹" + Intl.NumberFormat("en-IN").format(maturityAmount);
  const formattedPrincipalAmount =
    "₹" + Intl.NumberFormat("en-IN").format(principalAmount);

  const handlePress = () => {
    router.navigate({
      pathname: "/investments/fd-details",
      params: {
        issuerName,
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
          <TitleText size="$small">{issuerName}</TitleText>
          <BodyText size="$xsmall" fow="$emphasized" color="$text/secondary">
            {accountType}
          </BodyText>
        </YStack>
        <YStack gap="$_5" ai="flex-end">
          <TitleText
            size="$small"
            fow="$emphasized"
            fontVariant={["lining-nums", "tabular-nums"]}
          >
            {formattedMaturityAmount}
          </TitleText>
          <BodyText size="$xsmall" fow="$emphasized" color="$text/secondary">
            Maturity Amount
          </BodyText>
        </YStack>
      </XStack>

      <Separator my="$3" boc="$stroke/disabled" />

      <XStack gap="$1" jc="space-between">
        <YStack gap="$_5">
          <BodyText size="$xsmall" fow="$emphasized" color="$text/secondary">
            Interest Rate
          </BodyText>
          <TitleText size="$small" fontVariant={["lining-nums", "tabular-nums"]}>
            {interestRate}%
          </TitleText>
        </YStack>
        <YStack gap="$_5" ai="center">
          <BodyText size="$xsmall" fow="$emphasized" color="$text/secondary">
            Invested
          </BodyText>
          <TitleText size="$small" fontVariant={["lining-nums", "tabular-nums"]}>
            {formattedPrincipalAmount}
          </TitleText>
        </YStack>
        <YStack gap="$_5" ai="flex-end">
          <BodyText size="$xsmall" fow="$emphasized" color="$text/secondary">
            Maturity Date
          </BodyText>
          <TitleText
            size="$small"
            fow="$emphasized"
            fontVariant={["lining-nums", "tabular-nums"]}
          >
            {format(new Date(maturityDate), "dd/MM/yy")}
          </TitleText>
        </YStack>
      </XStack>
    </View>
  );
};
