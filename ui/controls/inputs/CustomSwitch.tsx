/**
 * Imports
 */
// React and RN
import { forwardRef, useEffect, useRef, ReactNode, useState } from "react";
import type { View } from "react-native";
import { Animated, Pressable } from "react-native";

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import type { SwitchProps as SwitchHeadlessProps } from "@tamagui/switch-headless";
import { useSwitch } from "@tamagui/switch-headless";

/**
 *
 * @name CustomSwitch
 *
 * @description
 * Basic Switch component using Qwark colors
 *
 * Internal component for the headless switch
 */
const HeadlessSwitch = forwardRef<View, SwitchHeadlessProps>((props, ref): ReactNode => {
  const [checked, onCheckedChange] = useState(props.defaultChecked || false);
  const { switchProps, switchRef, bubbleInput } = useSwitch(
    props,
    [checked, onCheckedChange],
    ref
  );

  const [animation] = useState(() => new Animated.Value(checked ? 1 : 0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: checked ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [checked, animation]);

  return (
    <>
      <Pressable
        style={{
          width: 36,
          height: 20,
          borderRadius: 100,
          backgroundColor: checked ? "#001484" : "#6E7678",
          justifyContent: "center",
        }}
        ref={switchRef}
        {...switchProps}
      >
        <Animated.View
          style={[
            {
              backgroundColor: "#fff",
              borderRadius: 100,
              width: 14,
              height: 14,
            },

            {
              transform: [
                {
                  translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [3, 19],
                  }),
                },
              ],
            },
          ]}
        />
      </Pressable>

      {bubbleInput}
    </>
  );
});

/**
 * Wrapper for the headless switch
 * @returns {ReactNode} Consumable React component
 */

interface CustomSwitchType extends SwitchHeadlessProps {}

export const CustomSwitch: React.FC<CustomSwitchType> = (props) => {
  return <HeadlessSwitch {...props} />;
};
