import { Animated, useWindowDimensions } from 'react-native';
import { getTokens, View, ViewProps } from 'tamagui';

type SliderPaginationProps = Pick<ViewProps, 'mt' | 'mb' | 'ai'> & {
  numberOfPages: number;
  scrollX: Animated.Value;
};

export const SliderPagination: React.FC<SliderPaginationProps> = ({
  numberOfPages,
  scrollX,
  ...rest
}) => {
  const { width: screen_width } = useWindowDimensions();
  const { color, space } = getTokens();
  const width = screen_width - 2 * 20; // To account for padding

  if (numberOfPages <= 1) {
    return null; // No pagination needed for a single page
  }

  const colorInactive = color['icon/disabled'].val;
  const colorActive = color['icon/accent'].val;

  return (
    <View {...rest}>
      <View fd="row" px="$5">
        {Array.from({ length: numberOfPages }).map((_, idx) => {
          const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [12, 32, 12],
            extrapolate: 'clamp',
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [colorInactive, colorActive, colorInactive],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={idx}
              style={{
                width: dotWidth,
                height: space.$2.val,
                borderRadius: space.$2.val,
                marginHorizontal: space.$_5.val,
                backgroundColor: backgroundColor,
              }}
            ></Animated.View>
          );
        })}
      </View>
    </View>
  );
};
