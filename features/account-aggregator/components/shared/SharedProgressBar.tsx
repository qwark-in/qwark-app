import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { View } from 'tamagui';

type SharedProgressbarProps = {
  value: number;
};

export const SharedProgressbar: React.FC<SharedProgressbarProps> = ({ value }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(value, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
  }, [value]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
    };
  });

  return (
    <View height={4} bg="#BAE6FF">
      <Animated.View
        style={[
          {
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            height: 4,
            backgroundColor: '#001484',
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};
