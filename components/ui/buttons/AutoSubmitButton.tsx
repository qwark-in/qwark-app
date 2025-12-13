import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { View, XStack } from 'tamagui';
import { BodyText } from '../typography';

type AutoSubmitButtonProps = {
  children: string;
  duration?: number; // in ms
  isLoading?: boolean;
  onSubmit: () => void;
};

const AnimatedOverlay = Animated.createAnimatedComponent(View);

export const AutoSubmitButton: React.FC<AutoSubmitButtonProps> = ({
  duration = 5000,
  isLoading,
  onSubmit,
  children,
}) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [text, setText] = useState('Confirming');
  const overlayWidth = useSharedValue(0);

  useEffect(() => {
    overlayWidth.value = withTiming(
      100,
      {
        duration,
        easing: Easing.linear,
      },
      (finished) => {
        if (finished) {
          runOnJS(setIsAnimating)(false);
          runOnJS(onSubmit)();
          runOnJS(setText)('Confirmed');
        }
      }
    );
  }, []);

  const completeAnimation = () => {
    overlayWidth.value = 100;
    setIsAnimating(false);
    setText('Confirm');
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${overlayWidth.value}%`,
    };
  });

  return (
    <View
      onPress={isAnimating ? completeAnimation : onSubmit}
      bg={isAnimating ? '#c0c0c0' : isLoading ? '#c0c0c0' : '$qwark/primary'}
      py="$3"
      br={9999}
      position="relative"
      overflow="hidden"
      ai="center"
      jc="center"
    >
      <XStack gap="$3">
        <BodyText zIndex={1} fow="$emphasized" color="$qwark/white">
          {children}
        </BodyText>
        {isLoading && <ActivityIndicator size="small" color="#FFF" />}
      </XStack>

      {isAnimating && (
        <AnimatedOverlay
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: 'rgb(0, 20, 132)',
              zIndex: 0,
            },
            animatedStyle,
          ]}
        />
      )}
    </View>
  );
};
