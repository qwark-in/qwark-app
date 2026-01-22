import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, BackHandler, SectionList } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { View, YStack } from "tamagui";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import useCustomBottomSheetModal from "hooks/use-custom-bottom-sheet-modal";
import { useDebounce } from "hooks/use-debounce";
import { FilledButton } from "ui/controls/buttons";
import { CamsFooter } from "ui/layout/FooterWrapper";
import { BodyText, LabelText, TitleText } from "ui/display/typography";
import { useFetchFipList, useGetConsentDetails } from "data/api";
import { useAAStore } from "data/stores/aa-store";
import { useUserStore } from "data/stores/user-store";
import { FipDataType } from "data/models/account-aggregator";
import { useInit } from "features/account-aggregator/hooks/useInit";
import { getSections } from "features/account-aggregator/helpers/getSections";
import { BankCheckboxHorizontal } from "features/account-aggregator/components/BankCheckboxHorizontal";
import { SharedProgressbar } from "features/account-aggregator/components/shared/SharedProgressBar";
import { SearchBanksInput } from "features/account-aggregator/components/SearchBanksInput";
import { SelectedBanksPillsView } from "features/account-aggregator/components/SelectedBanksPillsView";
import { LinkAccountsBottomSheet } from "features/account-aggregator/components/bottom-sheets/LinkAccountsBottomSheet";
import { useLogout } from "features/auth/hooks";

export default function SelectBanksScreen() {
  const [filterText, setFilterText] = useState<string>("");
  const debouncedFilterText = useDebounce(filterText, 150);
  const { bottomSheetModalRef, presentBottomSheetModal } = useCustomBottomSheetModal();
  const fips = useAAStore((store) => store.fips);
  const session_id = useAAStore((store) => store.session_id);
  const selectedBanks = useAAStore((store) => store.selectedBanks);
  const resetFips = useAAStore((store) => store.resetFips);
  const setSelectedBanks = useAAStore((store) => store.setSelectedBanks);
  const { animatedFooterStyle, ...scrollHandlers } = useAnimatedFooter();
  const { phone } = useUserStore();
  const router = useRouter();

  const { isLoading: fipListIsLoading, isValidating: fipListIsValidating } =
    useFetchFipList();
  const { getConsentDetails } = useGetConsentDetails();
  const { init, isLoading } = useInit();
  const { logout } = useLogout();

  const banks = fips.filter((fip) => fip.asset_class_id === "BANK"); // Only need to show fips of banks
  const sections = getSections(banks, debouncedFilterText);

  const goBackWithLogout = async () => {
    await logout();
    // resetFips();
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (router.canGoBack()) {
          router.back(); // then go back
          resetFips();
        } else {
          console.log("Logging out from select banks screen");
          goBackWithLogout();
        }
        return true; // prevent default back
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => subscription.remove(); // cleanup on unmount
    }, []),
  );

  const renderItem = useCallback(
    ({ item }: { item: FipDataType }) => (
      <View px="$5">
        <BankCheckboxHorizontal
          bank={item}
          checked={selectedBanks.some((fip) => fip.fip_id === item.fip_id)}
          handleSelectedBanks={setSelectedBanks}
        />
      </View>
    ),
    [selectedBanks, setSelectedBanks],
  );

  const renderSectionHeader = useCallback(
    ({ section: { title } }) => (
      <View px="$7" pt="$3">
        <LabelText size="$large" pb="$1">
          {title}
        </LabelText>
      </View>
    ),
    [],
  );

  const handlePress = async () => {
    try {
      const response = await init();

      if (session_id) {
        try {
          const sessionResponse = await getConsentDetails({
            consent_handle: response?.consent_handles[0].consent_handle!,
            mobile_number: phone,
            session_id: session_id,
          });

          console.log("session_id status ->", sessionResponse.status);

          if (sessionResponse.status === "ok") {
            router.navigate("/(app)/account-aggregator/account-discovery");
          }
        } catch (error) {
          presentBottomSheetModal();
        }
      } else {
        presentBottomSheetModal();
      }
    } catch (error) {
      console.log("init error ->", error);
    }
  };

  if (fipListIsLoading || fipListIsValidating) {
    return (
      <View f={1} jc="center" ai="center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View f={1} jc="space-between" bg="#FAFAFC">
      <View f={1}>
        <SharedProgressbar value={40} />

        <View px="$5" pt="$5">
          <TitleText size="$large" fow="$emphasized">
            Select the banks where you hold an account
          </TitleText>
        </View>

        {/* Search Input and Selected Banks View */}

        <View px="$5" py="$3">
          <SearchBanksInput filterText={filterText} onChangeFilterText={setFilterText} />

          <SelectedBanksPillsView selectedBanks={selectedBanks} />
        </View>

        {/* If search text does not match any bank*/}

        {sections.length === 0 && (
          <View p="$5">
            <BodyText ta="center" color="$text/disabled">
              No banks match your search.
            </BodyText>
          </View>
        )}

        {/* Main Section List*/}

        <SectionList
          {...scrollHandlers}
          bounces={false}
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          // stickySectionHeadersEnabled
          keyExtractor={(item) => item.fip_id}
          contentContainerStyle={{
            paddingBottom: 120,
            gap: 8,
          }}
          ListFooterComponent={
            <View px="$5" mt="$6">
              <BodyText ta="center" size="$small">
                Couldn't find your bank?
                <LabelText
                  onPress={() => router.navigate("/(app)/account-aggregator/coming-soon")}
                  size="$large"
                  fow="$emphasized"
                  color="#001484"
                >
                  {" "}
                  Browse{" "}
                </LabelText>
                the list of banks we'll be supporting soon.
              </BodyText>
            </View>
          }
        />
      </View>

      {/* Animated Footer Component*/}

      <Animated.View
        style={[
          animatedFooterStyle,
          { position: "absolute", bottom: 0, left: 0, right: 0 },
        ]}
      >
        <CamsFooter>
          <YStack gap="$3">
            <FilledButton
              onPress={handlePress}
              iconAfter={isLoading ? <ActivityIndicator /> : null}
              disabled={
                selectedBanks.filter((bank) => bank.asset_class_id === "BANK").length ===
                  0 || isLoading
              }
            >
              Continue
            </FilledButton>
          </YStack>
        </CamsFooter>
      </Animated.View>
      <LinkAccountsBottomSheet ref={bottomSheetModalRef} />
    </View>
  );
}

const useAnimatedFooter = () => {
  // Reanimated stuff
  const footerOffset = useSharedValue(0);

  const animateFooter = (toValue: number, delay: number) => {
    footerOffset.value = withDelay(delay, withTiming(toValue, { duration: 200 }));
  };

  const onScrollBeginDrag = () => animateFooter(35, 100);
  const onScrollEndDrag = () => animateFooter(0, 500);
  const onMomentumScrollBegin = () => animateFooter(35, 100);
  const onMomentumScrollEnd = () => animateFooter(0, 500);

  const animatedFooterStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: footerOffset.value }],
  }));

  return {
    animatedFooterStyle,
    onScrollBeginDrag,
    onScrollEndDrag,
    onMomentumScrollBegin,
    onMomentumScrollEnd,
  };
};
