import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  BackHandler,
  useWindowDimensions,
} from "react-native";
import { ScrollView, View, XStack, YStack } from "tamagui";
import { useRouter } from "expo-router";
import useCustomBottomSheetModal from "hooks/use-custom-bottom-sheet-modal";
import { useAAStore } from "data/stores/aa-store";
import { useDiscoverMultipleAccounts } from "data/api";
import { SharedProgressbar } from "features/account-aggregator/components/shared/SharedProgressBar";
import { BodyText, LabelText, TitleText } from "ui/display/typography";
import { findOutWhyData } from "features/account-aggregator/constants";
import { FilledButton } from "ui/controls/buttons";
import { CamsfinservLogo } from "ui/assets/logos";
import { TopTabs } from "features/account-aggregator/components/TopTabs";
import { BanksTab } from "features/account-aggregator/components/BanksTab";
import { InvestmentsTab } from "features/account-aggregator/components/InvestmentsTab";
import { CamsFooter } from "ui/layout/FooterWrapper";
import { Checkbox } from "ui/controls/inputs";
import { ConsentDetailsBottomSheet } from "features/account-aggregator/components/bottom-sheets/ConsentDetailsBottomSheet";
import { AuthoriseBanksBottomSheet } from "features/account-aggregator/components/bottom-sheets/AuthoriseBanksBottomSheet";

const AccountDiscoveryScreen = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { bottomSheetModalRef, presentBottomSheetModal } = useCustomBottomSheetModal();
  const {
    bottomSheetModalRef: consentDetailsBottomSheetRef,
    presentBottomSheetModal: consentDetailsPresentBottomSheetModal,
  } = useCustomBottomSheetModal();
  const { width } = useWindowDimensions();
  const discoveredAccounts = useAAStore((store) => store.discoveredAccounts);
  const selectedAccounts = useAAStore((store) => store.selectedAccounts);
  const selectedEntities = useAAStore((store) => store.selectedEntities);
  const resetDiscoveredAccounts = useAAStore((store) => store.resetDiscoveredAccounts);
  const resetFips = useAAStore((store) => store.resetFips);
  const { triggerDiscoverAccounts, discoverAccountsIsLoading } =
    useDiscoverMultipleAccounts();
  const [isConsent, setIsConsent] = useState<boolean>(false);
  const router = useRouter();

  const handleTabSelect = (index: number) => {
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const isButtonDisabled = !isConsent || selectedAccounts.length === 0;
  const investments = discoveredAccounts.filter(
    (account) => account.asset_class_id !== "BANK"
  );
  const banks = discoveredAccounts.filter((account) => account.asset_class_id === "BANK");

  const scrollEnabled = investments.length > 0 && banks.length > 0;

  useEffect(() => {
    const onBackPress = () => {
      if (router.canGoBack() && discoveredAccounts.length > 0) {
        resetDiscoveredAccounts();
        resetFips();
        router.back(); // then go back
      }
      return true; // prevent default back
    };

    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () => subscription.remove(); // cleanup on unmount
  }, [discoveredAccounts]);

  if (discoverAccountsIsLoading) {
    return (
      <View f={1} ai="center" jc="center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (discoveredAccounts.length === 0) {
    return (
      <View f={1} jc="space-between">
        <SharedProgressbar value={60} />
        <View f={1} px="$5" py="$6" gap="$6">
          <YStack gap="$2">
            <TitleText size="$large" fow="$emphasized">
              Couldnt find your account?
            </TitleText>
            <BodyText color="$text/secondary">
              Unable to locate your account using RBI's Account Aggregator Ecosystem, see
              possible reasons.
            </BodyText>
          </YStack>

          {findOutWhyData.map(({ title, subtitle }, i) => (
            <YStack gap="$1" key={i}>
              <TitleText>{title}</TitleText>
              <BodyText color="#6F6F6F">{subtitle}</BodyText>
            </YStack>
          ))}
        </View>

        <View p="$5">
          <FilledButton
            onPress={() => {
              if (selectedEntities.includes("BANK")) {
                router.back();
              } else {
                triggerDiscoverAccounts();
              }
            }}
          >
            Try Again
          </FilledButton>

          <XStack gap="$2" mt="$3" jc="center" ai="center">
            <BodyText size="$xsmall">RBI regulated Account Aggregator</BodyText>
            <CamsfinservLogo />
          </XStack>
        </View>
      </View>
    );
  }

  return (
    <View f={1} jc="space-between">
      <View f={1}>
        <SharedProgressbar value={60} />
        <View px="$5" pt="$5">
          <TitleText size="$large" fow="$emphasized">
            Select the accounts you want to connect
          </TitleText>
        </View>
        {scrollEnabled ? (
          <TopTabs scrollX={scrollX} onTabSelect={handleTabSelect} />
        ) : null}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          scrollEnabled={scrollEnabled}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
            useNativeDriver: false,
          })}
        >
          {banks.length > 0 && <BanksTab />}
          {investments.length > 0 && <InvestmentsTab />}
        </ScrollView>
      </View>
      <CamsFooter>
        <YStack gap="$3">
          <XStack gap="$3" ai="center">
            <View hitSlop={10} onPress={() => setIsConsent(!isConsent)}>
              <Checkbox checked={isConsent} />
            </View>
            <BodyText fs={1}>
              I give consent to update my balances and transactions daily
            </BodyText>
            <LabelText
              size="$medium"
              fow="$emphasized"
              color="$buttonText/secondary"
              bbw={1}
              bbc="$stroke/accent"
              onPress={consentDetailsPresentBottomSheetModal}
            >
              See Details
            </LabelText>
          </XStack>
          <FilledButton disabled={isButtonDisabled} onPress={presentBottomSheetModal}>
            Connect Accounts
          </FilledButton>
        </YStack>
      </CamsFooter>
      <ConsentDetailsBottomSheet ref={consentDetailsBottomSheetRef} />
      <AuthoriseBanksBottomSheet ref={bottomSheetModalRef} />
    </View>
  );
};

export default AccountDiscoveryScreen;
