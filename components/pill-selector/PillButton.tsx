import React from "react";
import { Pressable } from "react-native";
import { View, ViewProps, XStack, getTokenValue } from "tamagui";
import { LabelText } from "components/ui/typography";
import { SvgProps } from "react-native-svg";

export type PillProps = {
  textProps?: React.ComponentProps<
    typeof import("components/ui/typography").BodyText
  >;
  styleProps?: ViewProps;
};

type PillButtonProps = PillProps & {
  title: string;
  icon?: React.FC<SvgProps>;
  selected: boolean;
  onSelect: () => void;
};

const _PillButton: React.FC<PillButtonProps> = ({
  title,
  icon,
  selected,
  onSelect,
  textProps,
  styleProps,
}) => {
  const { px = 12, py = 6, mr = "$3", br } = styleProps || {}; // Default values for styleProps
  const brValue = typeof br === "string" ? getTokenValue(br) : br ?? 9999;

  const Icon = icon;

  return (
    <View
      bg="#FFF"
      boc={selected ? "$stroke/accent" : "$stroke/disabled"}
      bw={1}
      br={brValue}
      mr={mr}
    >
      <Pressable
        onPress={onSelect}
        android_ripple={{
          borderless: false,
          foreground: true,
          color: "rgba(0, 0, 0, 0.2)",
        }}
        style={{ overflow: "hidden", borderRadius: brValue }}
      >
        <View px={px} py={py}>
          <XStack gap="$2" ai="center">
            {Icon && <Icon height={16} width={16} />}
            <LabelText
              pt={2}
              {...textProps}
              fontVariant={["lining-nums", "tabular-nums"]}
            >
              {title}
            </LabelText>
          </XStack>
        </View>
      </Pressable>
    </View>
  );
};

export const PillButton = React.memo(_PillButton);
