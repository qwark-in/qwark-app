import React from "react";
import { View } from "tamagui";
import { useDashboardScreenStore } from "../store/dashboardScreenStore";
import { BodyText } from "ui/display/typography";
import { AnimatedRollingNumber } from "ui/display/animated-rolling-number/AnimatedRollingNumber";

type CashflowCardProps = {
  title: string;
  amount: number;
  type: "DEBIT" | "CREDIT";
};

export const CashflowCard: React.FC<CashflowCardProps> = ({ amount, title, type }) => {
  const isVisible = useDashboardScreenStore((store) => store.isVisible);
  return (
    <View bg="#FFF" px="$3" py="$4" br="$4" bw={1} boc="$stroke/disabled">
      <BodyText color="$text/secondary">{title}</BodyText>

      <AnimatedRollingNumber
        isVisible={isVisible}
        containerStyle={{ alignItems: "flex-start", marginTop: 4 }}
        value={type === "CREDIT" ? amount : -amount}
        enableCompactNotation={true}
        toFixed={2}
        locale={"en-IN"}
        useGrouping
        showPlusSign
        showMinusSign
        textStyle={{
          color: "#262626",
          fontWeight: "500",
          fontFamily: "RobotoSerifSemibold",
          fontSize: 28,
        }}
        compactNotationStyle={{
          fontSize: 18,
          lineHeight: 20,
        }}
        // (optional)  using the font-variant to avoid layout jumping when the number is updated
        numberStyle={{
          fontVariant: ["tabular-nums", "lining-nums"],
        }}
      />
    </View>
  );
};
