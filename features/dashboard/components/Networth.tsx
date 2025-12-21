import { View } from "tamagui";
import { useDashboardStore } from "data/stores/dashboard-store";
import { useDashboardScreenStore } from "../store/dashboardScreenStore";
import { TitleText } from "ui/display/typography";
import { AnimatedRollingNumber } from "ui/display/animated-rolling-number/AnimatedRollingNumber";

export const Networth = () => {
  const networth = useDashboardStore((store) => store.networth);
  const isVisible = useDashboardScreenStore((store) => store.isVisible);

  if (!networth) {
    return null;
  }

  return (
    <View>
      <TitleText size="$large" fow="$emphasized">
        Networth
      </TitleText>

      <View
        bg="#FFF"
        mt="$3"
        bw={1}
        boc="$stroke/disabled"
        px="$4"
        py="$5"
        br="$4"
        gap="$3"
      >
        <AnimatedRollingNumber
          isVisible={isVisible}
          containerStyle={{ alignItems: "flex-start" }}
          value={networth.amount}
          toFixed={2}
          locale={"en-IN"}
          useGrouping
          enableCompactNotation={true}
          // formattedText={hide ? '₹******' : undefined}
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

        {/* <NetworthChart /> */}
      </View>
    </View>
  );
};
