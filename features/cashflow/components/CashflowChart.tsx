import React, { useEffect } from "react";
import { View, XStack } from "tamagui";
import { format, isAfter, isWithinInterval } from "date-fns";
import { getDataTotalByDuration, sortChartData } from "../helpers";
import { getChartData } from "../helpers/getChartData";
import { CashFlow } from "data/models/dashboard";
import { useCashflowScreenStore } from "../store/cashflow-screen-store";
import { BodyText, TitleText } from "ui/display/typography";
import { timeframes } from "features/dashboard/constants";
import { TimeframeSelector } from "features/dashboard/components/TimeframeSelectorCustom";

import { Chart } from "./Chart";

const CHART_HEIGHT = 180;
const YAXIS_EXTRA_HEIGHT = 30;
const SPACING_TO_BARWIDTH_RATIO = 0.8;

type CashflowChartProps = {
  cashflow: CashFlow[];
};

export const CashflowChart: React.FC<CashflowChartProps> = ({ cashflow }) => {
  const appliedFilters = useCashflowScreenStore((store) => store.appliedFilters);
  const setDuration = useCashflowScreenStore((store) => store.setDuration);

  const data = cashflow.flatMap((item) =>
    item.transactions
      .filter((item) =>
        isWithinInterval(item.date, {
          start: new Date(appliedFilters.dates.fromDate),
          end: new Date(appliedFilters.dates.toDate),
        })
      )
      .map((a) => ({ value: a.amount, date: a.date }))
  );

  const dataTotalByDate = getDataTotalByDuration(data, appliedFilters.duration, {
    startDate: appliedFilters.dates.fromDate.toISOString(),
    endDate: appliedFilters.dates.toDate.toISOString(),
  });
  const dataSorted = sortChartData(dataTotalByDate);
  const chartData = getChartData(dataSorted);

  // Chart X-axis labels
  const startLabel = format(appliedFilters.dates.fromDate, "dd MMM yy");
  const endLabel = format(appliedFilters.dates.toDate, "dd MMM yy");

  useEffect(() => {
    const lastTransactionDate = cashflow
      .map((item) => item.lastTransactionDate)
      .reduce((acc, curr) => (isAfter(curr, acc) ? curr : acc));

    setDuration("1M", new Date(lastTransactionDate));
  }, []);

  return (
    <View mb="$3">
      {dataSorted.length !== 0 ? (
        <Chart chartData={chartData} />
      ) : (
        <View h={CHART_HEIGHT + YAXIS_EXTRA_HEIGHT + 5} ai="center" jc="center">
          <TitleText>No Data Found</TitleText>
        </View>
      )}

      <XStack jc="space-between">
        <BodyText>{startLabel}</BodyText>
        <BodyText>{endLabel}</BodyText>
      </XStack>

      <View py="$2" mt="$3">
        <TimeframeSelector
          timeframes={timeframes}
          onTimeframeSelect={setDuration}
          selectedTimeframeValue={appliedFilters.duration}
        />
      </View>
    </View>
  );
};
