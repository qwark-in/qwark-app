import React, { useMemo } from "react";
import { SectionList } from "react-native";
import { View, XStack } from "tamagui";
import { SortByBottomSheet } from "../../shared/SortByBottomSheet";
import { StocksAndETFsHoldingsInfo } from "./StocksAndETFsHoldingsInfo";
import { StockAndETFsHoldingsListItem } from "./StockAndETFsHoldingsListItem";
import { stocksAndETFsHoldingsSortRadioListData as radioList } from "../constants";
import { sortEqTransactions } from "../helpers";
import { IconButton } from "ui/controls/buttons";
import { BodyText } from "ui/display/typography";
import { useRadioSelector } from "ui/controls/selectors/radio-selector";
import useCustomBottomSheetModal from "hooks/use-custom-bottom-sheet-modal";
import { useMarketStore } from "data/stores/market-store";

type StocksAndETFsHoldingsListProps = {};

export const StocksAndETFsHoldingsList: React.FC<
  StocksAndETFsHoldingsListProps
> = ({}) => {
  const holdingsData = useMarketStore((store) => store.eqHoldings?.holdingsData);
  const { bottomSheetModalRef, presentBottomSheetModal } = useCustomBottomSheetModal();
  const { value, onValueChange } = useRadioSelector<typeof radioList>("Current Value");

  if (!holdingsData) {
    return null; // Handled in parent container
  }

  const sortedHoldingsData = useMemo(
    () => sortEqTransactions(holdingsData, value),
    [value]
  );

  return (
    <View f={1}>
      <SectionList
        sections={[{ data: sortedHoldingsData }]}
        keyExtractor={(_, i) => i.toString()}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        // stickySectionHeadersEnabled={true} // TODO: Sticky header causes issues with pointer events
        renderItem={({ item }) => <StockAndETFsHoldingsListItem {...item} />}
        ListHeaderComponent={<StocksAndETFsHoldingsInfo />}
        renderSectionHeader={() => (
          <View pointerEvents="box-none">
            <XStack gap="$1_5" mt="$5" mb="$4" px="$5" ai="center">
              <BodyText size="$small" fow="$emphasized">
                Sort
              </BodyText>
              <IconButton name="filter" onPress={presentBottomSheetModal} />
            </XStack>
          </View>
        )}
      />
      <SortByBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        radioList={radioList}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
};
