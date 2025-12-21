import { View, XStack } from "tamagui";
import { DatesType } from "../../dashboard/types";
import { CustomDatePicker } from "./CustomDatePicker";
import { isAfter, isBefore } from "date-fns";
import { useCashflowScreenStore } from "../store/CashflowScreenStore";
import { useDashboardStore } from "data/stores/dashboard-store";

type CustomDateBAMContentProps = {};

export const CustomDateBAMContent: React.FC<CustomDateBAMContentProps> = ({}) => {
  const dates = useCashflowScreenStore((store) => store.selectedFilters.dates);
  const setCustomDates = useCashflowScreenStore((store) => store.setCustomDates);
  const cashflow = useDashboardStore((store) => store.cashflow)!;

  const handleFromDateChange = (fromDate: Date) => {
    const newDates: DatesType = {
      fromDate: fromDate,
      toDate: dates.toDate,
    };
    setCustomDates(newDates);
  };

  const handleToDateChange = (toDate: Date) => {
    const newDates: DatesType = {
      fromDate: dates.fromDate,
      toDate: toDate,
    };
    setCustomDates(newDates);
  };

  const maximumDate = cashflow
    .map((item) => item.lastTransactionDate)
    .reduce((acc, curr) => (isAfter(curr, acc) ? curr : acc));
  const minimumDate = cashflow
    .map((item) => item.firstTransactionDate)
    .reduce((acc, curr) => (isBefore(curr, acc) ? curr : acc));

  return (
    <View px="$5">
      <View py="$4">
        <XStack gap="$4" jc="space-around">
          <CustomDatePicker
            label="From"
            maximumDate={new Date(maximumDate)}
            minimumDate={new Date(minimumDate)}
            onChange={handleFromDateChange}
            value={dates.fromDate}
          />
          <CustomDatePicker
            label="To"
            maximumDate={new Date(maximumDate)}
            minimumDate={new Date(minimumDate)}
            onChange={handleToDateChange}
            value={dates.toDate}
          />
        </XStack>
      </View>
    </View>
  );
};
