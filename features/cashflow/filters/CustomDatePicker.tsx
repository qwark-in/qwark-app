import { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Input, View, XStack } from "tamagui";
import { LabelText } from "ui/display/typography";
import { IconButton } from "ui/controls/buttons";
import { DatePicker } from "ui/controls/inputs/DatePicker";
import { DatePickerWeb } from "ui/controls/inputs/DatePickerWeb";

type CustomDatePickerProps = {
  label: string;
  value: Date;
  minimumDate: Date;
  maximumDate: Date;
  onChange: (date: Date) => void;
};

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  minimumDate,
  maximumDate,
  onChange,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View gap="$1">
      <LabelText fow="$emphasized" color="#525252">
        {label}
      </LabelText>

      {Platform.OS !== "web" ? (
        <TouchableOpacity
          onPress={() => {
            if (!isVisible) {
              setIsVisible(true);
            }
          }}
        >
          <XStack p={0} pb="$2" ai="center" jc="space-between" bbw={1} bbc={"#6F6F6F"}>
            <Input
              value={
                value &&
                value.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              }
              width={100}
              unstyled
              padding={0}
              editable={false}
              color={"#161616"}
              placeholder="DD/MM/YYYY"
              fontSize={12}
              fontWeight={"400"}
              letterSpacing={0.28}
              disabled
            />
            <IconButton
              name="calendar"
              onPress={() => {
                if (!isVisible) {
                  setIsVisible(true);
                }
              }}
            />
          </XStack>

          {isVisible && (
            <DatePicker
              value={value}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
              hidePicker={() => setIsVisible(false)}
              onChange={onChange}
            />
          )}
        </TouchableOpacity>
      ) : (
        <DatePickerWeb
          value={value}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onChange={onChange}
        />
      )}
    </View>
  );
};
