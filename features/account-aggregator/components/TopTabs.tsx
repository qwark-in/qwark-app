import { View } from "tamagui";
import { Animated, Pressable, useWindowDimensions } from "react-native";
import { useAAStore } from "data/stores/aa-store";
import { LabelText } from "ui/display/typography";

type OptionalTabsProps =
  | {
      disabled: true;
      onTabSelect?: (index: number) => void;
    }
  | {
      disabled?: false; // also covers undefined (default false)
      onTabSelect: (index: number) => void;
    };

type TopTabsProps = { scrollX: Animated.Value } & OptionalTabsProps;

export const TopTabs: React.FC<TopTabsProps> = ({ scrollX, onTabSelect, disabled }) => {
  const { width } = useWindowDimensions();
  const discoveredAccounts = useAAStore((store) => store.discoveredAccounts);
  const banks = discoveredAccounts.filter((account) => account.asset_class_id === "BANK");
  const investments = discoveredAccounts.filter(
    (account) => account.asset_class_id !== "BANK"
  );
  const animtedViewWidth = (width - 48) / 2;

  const translateX = scrollX.interpolate({
    inputRange: [0, width],
    outputRange: [0, animtedViewWidth],
  });

  return (
    <View bg="#FFF" px="$5" py="$3">
      <View fd="row" bg="#E7E7E7" br={9999} pos="relative">
        <Animated.View
          style={[
            {
              transform: [{ translateX }],
            },
            {
              position: "absolute",
              backgroundColor: "#FFF",
              borderRadius: 9999,
              height: 36,
              width: animtedViewWidth,
              margin: 4,
            },
          ]}
        />
        <Pressable
          onPress={() => {
            if (disabled) return;
            onTabSelect(0);
          }}
          style={{
            flex: 1,
            flexGrow: 1,
            alignItems: "center",
            paddingVertical: 12,
          }}
        >
          <LabelText size="$large">
            Banks ({banks.flatMap((item) => item.accounts).length})
          </LabelText>
        </Pressable>
        <Pressable
          onPress={() => {
            if (disabled) {
              return;
            }
            onTabSelect(1);
          }}
          style={{
            flex: 1,
            flexGrow: 1,
            alignItems: "center",
            paddingVertical: 12,
          }}
        >
          <LabelText size="$large">
            Investments ({investments.flatMap((item) => item.accounts).length})
          </LabelText>
        </Pressable>
      </View>
    </View>
  );
};
