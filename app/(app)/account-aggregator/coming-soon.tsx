import { useCallback, useEffect } from "react";
import { BackHandler, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { View, XStack, YStack } from "tamagui";
import { useToastController } from "@tamagui/toast";
import { useFinancialProfileStore } from "data/stores/financial-profile-store";
import { Icon } from "ui/assets/icons/adaptive";
import { BodyText, TitleText } from "ui/display/typography";
import { CheckRound } from "ui/assets/icons/fixed-color";
import { SharedProgressbar } from "features/account-aggregator/components/shared/SharedProgressBar";
import { FilledButton } from "ui/controls/buttons";
import { CamsfinservLogo } from "ui/assets/logos";

type ComingSoonBankType = {
  fip_name: string;
};

const comingSoonBanks: ComingSoonBankType[] = [
  { fip_name: "DBS Bank" },
  { fip_name: "Suryoday Small Finance Bank Limited" },
  { fip_name: "Ujjivan Small Finance Bank" },
  { fip_name: "HSBC Bank" },
  { fip_name: "RBL Bank Limited" },
  { fip_name: "Slice Small Finance Bank Limited" },
  { fip_name: "South Indian Bank" },
  { fip_name: "Standard Chartered Bank" },
];

export default function ComingSoonScreen() {
  const router = useRouter();
  const subscribedBanks = useFinancialProfileStore((store) => store.subscribedBanks);
  const subscribeBank = useFinancialProfileStore((store) => store.subscribeBank);
  const toast = useToastController();

  const handleSubscribeBank = (fip_name: string) => {
    //TODO:Integrate api and add throttling to prevent multiple taps
    subscribeBank({ fip_name });
    toast.show("We will notify you when your bank is live!", {
      native: false,
      duration: 3000,
    });
  };

  const handleAlreadySubscribed = () => {
    toast.show(`Already subscribed to notification`, {
      native: false,
      duration: 3000,
    });
  };

  const renderItem = useCallback(
    ({ item }: { item: ComingSoonBankType }) => (
      <View
        f={1}
        fd="row"
        px="$4"
        py="$4"
        gap="$4"
        bw={1}
        ai="center"
        br="$4"
        boc="$stroke/disabled"
        bg="#FFF"
        pos="relative"
      >
        <Icon name="bank-logo-placeholder" size="md" />
        <View flex={1} fd="row" ai="flex-start">
          <TitleText numberOfLines={1} ellipsizeMode="tail">
            {item.fip_name}
          </TitleText>
        </View>
        {subscribedBanks.some((bank) => bank.fip_name === item.fip_name) ? (
          <Pressable hitSlop={20 * 1.1} onPress={handleAlreadySubscribed}>
            <CheckRound size={20} />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => handleSubscribeBank(item.fip_name)}
            android_ripple={{
              borderless: true,
              foreground: true,
              radius: 20,
              color: "#4589FF33",
            }}
            hitSlop={20 * 1.1}
          >
            {({ pressed }) => {
              return (
                <Icon name="bell" size="md" color={pressed ? "#001484" : "#697077"} />
              );
            }}
          </Pressable>
        )}
      </View>
    ),
    [subscribedBanks]
  );

  useEffect(() => {
    const onBackPress = () => {
      return true; // prevent default back
    };

    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => subscription.remove(); // cleanup on unmount
  }, []);

  return (
    <View f={1} jc="space-between" bg="#FAFAFC">
      <View f={1}>
        <SharedProgressbar value={40} />

        <View px="$5" pt="$5" mb="$6">
          <TitleText size="$large" fow="$emphasized">
            Coming Soon
          </TitleText>
          <BodyText mt="$2" color="$text/secondary">
            Please try connecting when your bank starts supporting Qwark
          </BodyText>
        </View>

        {/* Main Section List*/}

        <FlatList
          bounces={false}
          data={comingSoonBanks}
          renderItem={renderItem}
          keyExtractor={(item) => item.fip_name}
          contentContainerStyle={{
            paddingBottom: 20,
            paddingHorizontal: 20,
            gap: 8,
          }}
        />
      </View>

      <YStack p="$5" gap="$3" bg="#FFF">
        <FilledButton onPress={() => router.back()}>Got it!</FilledButton>
        <XStack jc="center" ai="center" gap="$2">
          <BodyText size="$xsmall" color="$text/secondary">
            RBI regulated Account Aggregator
          </BodyText>
          <CamsfinservLogo />
        </XStack>
      </YStack>
    </View>
  );
}
