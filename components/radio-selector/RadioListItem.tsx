import { RadioItem } from '@/ui/components/inputs';
import { LabelText, TitleText } from '@/ui/components/typography';
import { Pressable } from 'react-native';
import { Separator, View, XStack, getTokens } from 'tamagui';

type RadioListItemProps = {
  value: string;
  selected: boolean;
  isLastListItem: boolean;
  handleValuechange: (value: string) => void;
};

export const RadioListItem: React.FC<RadioListItemProps> = ({
  value,
  selected,
  isLastListItem,
  handleValuechange,
}) => {
  return (
    <View>
      <Pressable
        onPress={() => handleValuechange(value)}
        android_ripple={{ borderless: false, foreground: true, color: 'rgba(0, 0, 0, 0.2)' }}
      >
        <XStack jc="space-between" px="$4" py="$3">
          <TitleText>{value}</TitleText>
          <RadioItem
            value={value}
            color={selected ? '$icon/accent' : '$icon/secondary'}
            pointerEvents="none" // This is needed for controlled radio inputs with value change handler on container instead of RadioGroup
          />
        </XStack>
        {!isLastListItem && <Separator mx="$4" borderColor="$stroke/disabled" />}
      </Pressable>
    </View>
  );
};
