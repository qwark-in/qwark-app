import { Input, View } from "tamagui";
import { Icon } from "ui/assets/icons/adaptive";

type SearchBanksInputProps = {
  filterText: string;
  onChangeFilterText: (text: string) => void;
};

export const SearchBanksInput: React.FC<SearchBanksInputProps> = ({
  filterText,
  onChangeFilterText,
}) => {
  return (
    <View bg="#FFF" br="$7" h="48" jc="center" bw={1} boc="#E7E7E7">
      <View t={0} b={0} pos="absolute" jc="center" pl="$4">
        <Icon name="search" size="lg" />
      </View>
      <Input
        unstyled
        px="$4"
        py="$3"
        pl="$12"
        ai="center"
        ff="$body"
        fos="$medium"
        onChangeText={onChangeFilterText}
        value={filterText}
        placeholder="Select a bank"
      />
    </View>
  );
};
