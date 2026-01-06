import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

type DatePickerProps = {
  value: Date;
  minimumDate: Date;
  maximumDate: Date;
  onChange: (date: Date) => void;
  hidePicker: () => void;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  maximumDate,
  minimumDate,
  onChange,
  hidePicker,
}) => {
  return (
    <DateTimePicker
      mode="date"
      design="default"
      value={value || maximumDate}
      maximumDate={maximumDate}
      minimumDate={minimumDate}
      onChange={(date) => {
        onChange(new Date(date.nativeEvent.timestamp));
        hidePicker();
      }}
    />
  );
};
