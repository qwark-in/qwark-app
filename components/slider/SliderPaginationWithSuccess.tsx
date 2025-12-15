import { useEffect, useRef } from 'react';
import { Animated, useWindowDimensions } from 'react-native';
import { getTokens, View, ViewProps } from 'tamagui';

type SliderPaginationWithSuccessProps = Pick<ViewProps, 'mt' | 'mb' | 'ai'> & {
  accountsToLink: {
    fip_id: string;
    fip_name: string;
    isAuthorised: boolean;
  }[];
  scrollX: Animated.Value;
};

export const SliderPaginationWithSuccess: React.FC<SliderPaginationWithSuccessProps> = ({
  accountsToLink,
  scrollX,
  ...rest
}) => {
  const { width: screen_width } = useWindowDimensions();
  const { color, space } = getTokens();
  const width = screen_width - 2 * 20; // To account for padding

  if (accountsToLink.length <= 1) {
    return null; // No pagination needed for a single page
  }

  const colorInactive = color['icon/disabled'].val;
  const colorSuccess = color['green/50'].val;

  return (
    <View {...rest}>
      <View fd="row" px="$5">
        {accountsToLink.map((account, idx) => {
          const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [12, 32, 12],
            extrapolate: 'clamp',
          });

          // Each dot has its own animated color value
          const colorAnim = useRef(new Animated.Value(account.isAuthorised ? 1 : 0)).current;

          useEffect(() => {
            Animated.timing(colorAnim, {
              toValue: account.isAuthorised ? 1 : 0,
              duration: 600,
              useNativeDriver: false,
            }).start();
          }, [account.isAuthorised]);

          const backgroundColor = colorAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [colorInactive, colorSuccess],
          });

          return (
            <Animated.View
              key={account.fip_id}
              style={{
                width: dotWidth,
                height: space.$3.val,
                borderRadius: space.$3.val,
                marginHorizontal: space.$_5.val,
                backgroundColor,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};
