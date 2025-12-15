import React, { useCallback, useEffect, useRef } from "react";
import { FlatList, ListRenderItem } from "react-native";
import { PillButton, PillProps } from "./PillButton";
import { SvgProps } from "react-native-svg";

type PillSelectorListProps<T extends string> = PillProps & {
  pills: readonly { title: T; icon?: React.FC<SvgProps> }[];
  selected: T;
  onSelect: (pillTitle: T) => void;
};

export const PillSelectorList = <T extends string>({
  pills,
  selected,
  onSelect,
  ...rest
}: PillSelectorListProps<T>) => {
  const flatListRef = useRef<FlatList<(typeof pills)[number]>>(null);
  const renderItem: ListRenderItem<(typeof pills)[number]> = useCallback(
    ({ item }) => (
      <PillButton
        title={item.title}
        icon={item.icon}
        selected={item.title === selected}
        onSelect={() => onSelect(item.title)}
        {...rest}
      />
    ),
    [selected, onSelect]
  );

  useEffect(() => {
    const index = pills.findIndex((p) => p.title === selected);
    if (index !== -1 && flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [selected, pills]);

  return (
    <FlatList
      ref={flatListRef}
      scrollEnabled={pills.length > 2}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={pills}
      renderItem={renderItem}
    />
  );
};
