import { useGlobalStore } from "data/stores/global-store";
import { useRouter } from "expo-router";
import { View, YStack } from "tamagui";
import { CheckGreen } from "ui/assets/icons/fixed-color";
import { FilledButton } from "ui/controls/buttons";
import { BodyText, HeadlineText } from "ui/display/typography";

export default function SuccessScreen() {
  const router = useRouter();
  const isAccountAggregatorCompleted = useGlobalStore(
    (store) => store.isAccountAggregatorCompleted
  );
  const setIsAccountAggregatorCompleted = useGlobalStore(
    (store) => store.setIsAccountAggregatorCompleted
  );

  const handlePress = () => {
    if (isAccountAggregatorCompleted) {
      router.dismissTo("/dashboard-tab");
    } else {
      router.push("/dashboard-tab");
    }

    if (!isAccountAggregatorCompleted) {
      setIsAccountAggregatorCompleted(true);
    }
  };

  return (
    <View f={1} bg="#FFF" jc="space-between">
      <View f={1} px="$5">
        <View marginVertical="auto" alignItems="center">
          <CheckGreen size={96} />
          <YStack gap="$2" mt="$10" alignItems="center">
            <HeadlineText size="$medium" fow="$emphasized" textAlign="center">
              Congratulations!
            </HeadlineText>
            <BodyText size="$large" ta="center">
              You have successfully started tracking your accounts!
            </BodyText>
          </YStack>
        </View>
        <BodyText fow="$emphasized" ta="center" mb="$5">
          Sit back and relax, while we generate insights about your spending pattern and
          the health of your portfolio!
        </BodyText>
      </View>

      <View p="$5" bg="#FFF">
        <FilledButton onPress={handlePress}>Go to Dashboard</FilledButton>
      </View>
    </View>
  );
}
