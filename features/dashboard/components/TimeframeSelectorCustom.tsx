import { View, XStack } from "tamagui";
import { TouchableOpacity } from "react-native";
import { useCallback, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CustomDateBAM } from "../../cashflow/filters/CustomDateBAM";
import { DurationType, Timeframe } from "../types";
import { isAfter } from "date-fns";
import { LabelText } from "ui/display/typography";
import { useDashboardStore } from "data/stores/dashboard-store";

type TimeframeSelectorCustomProps = {
  timeframes: Timeframe[];
  selectedTimeframeValue: string;
  onTimeframeSelect: (timeframeValue: DurationType, toDate: Date) => void;
};

export const TimeframeSelector: React.FC<TimeframeSelectorCustomProps> = ({
  timeframes,
  selectedTimeframeValue,
  onTimeframeSelect,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const cashflow = useDashboardStore((store) => store.cashflow)!;

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const lastTransactionDate = cashflow
    .map((item) => item.lastTransactionDate)
    .reduce((acc, curr) => (isAfter(curr, acc) ? curr : acc));

  const handlePress = (timeframeValue: DurationType) => {
    onTimeframeSelect(timeframeValue, new Date(lastTransactionDate));
    if (timeframeValue === "CUSTOM_DATES") {
      handlePresentModalPress();
    }
  };

  return (
    <View>
      <XStack justifyContent="center">
        {timeframes.map((item) => {
          return (
            <TouchableOpacity key={item.id} onPress={() => handlePress(item.value)}>
              <View
                px={14}
                py="$1_5"
                borderRadius={9999}
                bg={item.value === selectedTimeframeValue ? "$blue/10" : "#fff"}
              >
                <LabelText
                  size="$small"
                  color={
                    item.value === selectedTimeframeValue ? "$blue/50" : "$text/primary"
                  }
                >
                  {item.label}
                </LabelText>
              </View>
            </TouchableOpacity>
          );
        })}
      </XStack>
      <CustomDateBAM bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
};
