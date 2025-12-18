import { useLocalSearchParams } from "expo-router";
import { Separator, View, XStack, YStack } from "tamagui";
import { format } from "date-fns";
import { BodyText, LabelText, TitleText } from "ui/display/typography";
import { capitalize } from "helpers/capitalize";
import { useMarketStore } from "data/stores/market-store";

export default function SIPDetailsScreen() {
  const sipData = useMarketStore((store) => store.mfHoldings?.sipData)!;
  const { mfName } = useLocalSearchParams();
  const sipDetails = sipData.find((item) => item.mfName === mfName);

  if (!sipDetails) {
    return (
      <View>
        <TitleText>No Data Found</TitleText>
      </View>
    );
  }

  return (
    <View flex={1} px="$5" bg="#FAFAFC">
      <View bg="#FFF" p="$4" br="$4" mt="$7" mb="$6" bw={1} boc="$stroke/disabled">
        <TitleText fontVariant={["lining-nums", "tabular-nums"]}>
          {sipDetails.mfName}
        </TitleText>
        <XStack mt="$2" gap="$1">
          <BodyText fow="$emphasized" color="$text/secondary">
            {capitalize(sipDetails.mfCategory)}
          </BodyText>
          <BodyText fow="$emphasized" color="$text/secondary">
            •
          </BodyText>
          <BodyText fow="$emphasized" color="$text/secondary">
            {capitalize(sipDetails.frequency)}
          </BodyText>
        </XStack>

        <Separator my="$4" />
        <XStack width="100%" jc="space-between">
          <YStack gap="$1">
            <BodyText fow="$emphasized" color="$text/secondary">
              SIP Amount
            </BodyText>
            <TitleText>₹{sipDetails.sipValue}</TitleText>
          </YStack>
          <YStack gap="$1">
            <BodyText ta="center" fow="$emphasized" color="$text/secondary">
              Next SIP
            </BodyText>
            <TitleText>{format(sipDetails.nextDueDate, "dd MMM yyyy")}</TitleText>
          </YStack>
        </XStack>
        <XStack mt="$4" jc="space-between">
          <BodyText color="$text/secondary">Folio Number</BodyText>
          <LabelText size="$large" fontVariant={["lining-nums", "tabular-nums"]}>
            {sipDetails.folioNumber}
          </LabelText>
        </XStack>
        <XStack mt="$1" jc="space-between">
          <BodyText color="$text/secondary">SIP Ref Number</BodyText>
          <LabelText size="$large" fontVariant={["lining-nums", "tabular-nums"]}>
            {sipDetails.sipRefNumber}
          </LabelText>
        </XStack>
      </View>
    </View>
  );
}
