import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Separator, View, XStack, YStack } from "tamagui";
import { SortByBottomSheet } from "../../shared/SortByBottomSheet";
import {
  pillButtonsMutualFundsHoldingsList as pills,
  activeSipsSortRadioListData,
  holdingsSortRadioListData,
} from "../constants";
import { MutualFundsHoldingsInfo } from "./MutualFundsHoldingsInfo";
import { format } from "date-fns";
import { useMarketStore } from "data/stores/market-store";
import useCustomBottomSheetModal from "hooks/use-custom-bottom-sheet-modal";
import { PillSelectorList, usePillSelector } from "ui/controls/selectors/pill-selector";
import { useRadioSelector } from "ui/controls/selectors/radio-selector";
import { BodyText, TitleText } from "ui/display/typography";
import { capitalize } from "helpers/capitalize";
import { MFHoldingsDataType, SipHoldingsDataType } from "data/models/market";
import { IconButton } from "ui/controls/buttons";
import { sortActiveSipList, sortMfTransactions } from "../helpers";

type MutualFundsHoldingsListProps = {};

const formatAmount = (amount: number) => {
  return Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
};

export const MutualFundsHoldingsList: React.FC<MutualFundsHoldingsListProps> = () => {
  const holdingsData = useMarketStore((store) => store.mfHoldings?.holdingsData);
  const sipData = useMarketStore((store) => store.mfHoldings?.sipData);

  const { bottomSheetModalRef, presentBottomSheetModal } = useCustomBottomSheetModal();
  const {
    bottomSheetModalRef: bottomSheetModalRefSip,
    presentBottomSheetModal: presentBottomSheetModalSip,
  } = useCustomBottomSheetModal();

  const pillsWithSips = pills.map((pill) =>
    pill.title === "Active SIPs" ? { title: pill.title + ` (${sipData?.length})` } : pill
  );
  const { selected, onSelect } = usePillSelector<typeof pillsWithSips>("Holdings");
  const { value, onValueChange } =
    useRadioSelector<typeof holdingsSortRadioListData>("Alphabetical");
  const { value: valueSipSort, onValueChange: onValueChangeSipSort } =
    useRadioSelector<typeof activeSipsSortRadioListData>("Alphabetical");

  if (!holdingsData) {
    return null; // Handled in parent container
  }

  const sortedHoldingsData = useMemo(
    () => sortMfTransactions(holdingsData, value),
    [value]
  );

  const sortedActiveSipsData = useMemo(
    () => sortActiveSipList(sipData ?? [], valueSipSort),
    [valueSipSort]
  );

  return (
    <View flex={1}>
      <FlatList
        ListHeaderComponent={
          <View>
            <MutualFundsHoldingsInfo />
            <XStack gap="$3" my="$4" ai="center" mx="$5">
              <XStack gap="$1" ai="center">
                <BodyText size="$small" fow="$emphasized">
                  Sort
                </BodyText>
                <IconButton
                  name="filter"
                  onPress={
                    selected === "Holdings"
                      ? presentBottomSheetModal
                      : presentBottomSheetModalSip
                  }
                />
              </XStack>
              <PillSelectorList
                pills={pillsWithSips}
                selected={selected}
                onSelect={onSelect}
                textProps={{ fos: "$small" }}
                styleProps={{
                  px: 10,
                  py: "$1",
                  mr: "$2",
                  br: 9999,
                }}
              />
            </XStack>
          </View>
        }
        data={selected === "Holdings" ? sortedHoldingsData : sortedActiveSipsData ?? []}
        renderItem={({ item }: { item: MFHoldingsDataType | SipHoldingsDataType }) =>
          selected === "Holdings" ? (
            <HoldingsListItem {...(item as MFHoldingsDataType)} />
          ) : (
            <SIPListItem {...(item as SipHoldingsDataType)} />
          )
        }
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      />
      <SortByBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        radioList={holdingsSortRadioListData}
        value={value}
        onValueChange={onValueChange}
      />
      <SortByBottomSheet
        bottomSheetModalRef={bottomSheetModalRefSip}
        radioList={activeSipsSortRadioListData}
        value={valueSipSort}
        onValueChange={onValueChangeSipSort}
      />
    </View>
  );
};

type MutualFundsHoldingsListItemProps = MFHoldingsDataType;

const HoldingsListItem: React.FC<MutualFundsHoldingsListItemProps> = ({
  currentValue,
  investedValue,
  lifetimeReturn,
  schemePlan,
  mfName,
  xirr,
}) => {
  const router = useRouter();

  const handlePress = () => {
    router.navigate({
      pathname: "/(app)/investments/mf-details",
      params: {
        mfName,
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
      <XStack jc="space-between">
        <YStack gap="$1" fs={1}>
          <TitleText size="$small">{mfName}</TitleText>
          <BodyText size="$small" fow="$emphasized" color="$text/secondary">
            {capitalize(schemePlan)}
          </BodyText>
        </YStack>
        <YStack ai="flex-end">
          <TitleText
            size="$small"
            fow="$emphasized"
            fontVariant={["lining-nums"]}
            color={xirr > 0 ? "$text/success" : "$text/error"}
          >
            {xirr}%
          </TitleText>
          <BodyText size="$small" fow="$emphasized" color="$text/secondary">
            XIRR
          </BodyText>
        </YStack>
      </XStack>

      <Separator marginVertical="$3" borderColor="$stroke/disabled" />

      <YStack gap="$1">
        <XStack jc="space-between">
          <YStack gap="$_5">
            <BodyText size="$xsmall" fow="$emphasized" color="$text/secondary">
              Current
            </BodyText>
            <TitleText size="$small" fontVariant={["lining-nums"]}>
              {formatAmount(currentValue)}
            </TitleText>
          </YStack>
          <YStack gap="$_5" ai="center">
            <BodyText size="$xsmall" fow="$emphasized" color="$text/secondary">
              Invested
            </BodyText>
            <TitleText size="$small" fontVariant={["lining-nums"]}>
              {formatAmount(investedValue)}
            </TitleText>
          </YStack>
          <YStack gap="$_5" ai="flex-end">
            <BodyText size="$xsmall" fow="$emphasized" color="$text/secondary">
              Returns
            </BodyText>
            <TitleText
              size="$small"
              fontVariant={["lining-nums"]}
              fow="$emphasized"
              color={lifetimeReturn.percentage > 0 ? "$text/success" : "$text/error"}
            >
              {lifetimeReturn.percentage}%
            </TitleText>
          </YStack>
        </XStack>
      </YStack>
    </View>
  );
};

type MutualFundsSIPListItemProp = SipHoldingsDataType;

const SIPListItem: React.FC<MutualFundsSIPListItemProp> = ({
  mfName,
  sipValue,
  nextDueDate,
}) => {
  const router = useRouter();
  return (
    <View
      bg="#FFF"
      bw={1}
      boc="$stroke/disabled"
      br="$3"
      p="$4"
      mb="$5"
      mx="$5"
      onPress={() =>
        router.navigate({
          pathname: "/investments/sip-details",
          params: {
            mfName,
          },
        })
      }
    >
      <XStack jc="space-between">
        <YStack gap="$1" fs={1}>
          <TitleText size="$small" fs={1}>
            {mfName}
          </TitleText>
          <TitleText color="$text/accent" fontVariant={["lining-nums"]}>
            {"₹" + Intl.NumberFormat("en-IN").format(sipValue)}
          </TitleText>
        </YStack>

        <YStack gap="$1" ai="center">
          <BodyText size="$small" fow="$emphasized" color="$text/secondary">
            Next Due
          </BodyText>
          <TitleText fontVariant={["lining-nums"]}>
            {format(nextDueDate, "MMM dd")}
          </TitleText>
        </YStack>
      </XStack>
    </View>
  );
};
