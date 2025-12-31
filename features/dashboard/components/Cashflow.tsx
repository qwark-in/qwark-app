import { View } from "tamagui";
import { useDashboardStore } from "data/stores/dashboard-store";
import { CashflowList } from "./CashflowList";
import { TitleText } from "ui/display/typography";

export const Cashflow = () => {
  const cashflow = useDashboardStore((store) => store.cashflow);

  if (!cashflow) {
    return null;
  }

  return (
    <View>
      <TitleText size="$large" fow="$emphasized">
        Cashflow
      </TitleText>
      <CashflowList cashflow={cashflow} />
    </View>
  );
};
