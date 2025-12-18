import React, { useMemo } from "react";
import { SectionList } from "react-native";
import { View, XStack } from "tamagui";
import { SortByBottomSheet } from "../../shared/SortByBottomSheet";
import { FDHoldingsInfo } from "./FDHoldingsInfo";
import { FDHoldingsListItem } from "./FDHoldingsListItem";
import { FDHoldingsSortRadioListData as radioList } from "../constants";
import { sortFdTransactions } from "../helpers";
import { BodyText } from "ui/display/typography";
import { IconButton } from "ui/controls/buttons";
import { useRadioSelector } from "ui/controls/selectors/radio-selector";
import useCustomBottomSheetModal from "hooks/use-custom-bottom-sheet-modal";
import { useMarketStore } from "data/stores/market-store";

type FDHoldingsListProps = {};

export const FDHoldingsList: React.FC<FDHoldingsListProps> = ({}) => {
  const holdingsData = useMarketStore((store) => store.fdHoldings?.holdingsData);
  const { bottomSheetModalRef, presentBottomSheetModal } = useCustomBottomSheetModal();
  const { value, onValueChange } = useRadioSelector<typeof radioList>("Maturity Amount");

  if (!holdingsData) {
    return null; // Handled in parent container
  }

  const sortedHoldingsData = useMemo(
    () => sortFdTransactions(holdingsData, value),
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
        renderItem={({ item }) => <FDHoldingsListItem {...item} />}
        ListHeaderComponent={<FDHoldingsInfo />}
        renderSectionHeader={() => (
          <View pointerEvents="box-none">
            <XStack gap="$1_5" mt="$5" mb="$4" px="$5" ai="center">
              <BodyText size="$small" fow="$emphasized">
                Sort
              </BodyText>
              <IconButton name="check" onPress={presentBottomSheetModal} />
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
