import { RadioGroup, ScrollView } from "tamagui";
import { RadioListItem } from "./RadioListItem";

type RadioSelectorListProps<T extends string> = {
  radioList: readonly { value: T }[];
  value: T;
  onValueChange: (value: T) => void;
};

export const RadioSelectorList = <T extends string>({
  radioList,
  value,
  onValueChange,
}: RadioSelectorListProps<T>) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <RadioGroup value={value}>
        {radioList.map((item, i, arr) => (
          <RadioListItem
            key={i}
            value={item.value}
            selected={item.value === value}
            handleValuechange={(value) => onValueChange(value as T)}
            isLastListItem={i === arr.length - 1}
          />
        ))}
      </RadioGroup>
    </ScrollView>
  );
};
