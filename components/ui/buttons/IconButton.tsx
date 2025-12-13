/**
 * @name IconButton
 *
 * @description
 * Button with icon
 */

/**
 * Imports
 */
// React and RN
import { Pressable, PressableProps } from 'react-native';

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { View } from 'tamagui';

// Local (e.g. this and other workspaces)
import { SvgProps } from '@/assets';
import { ReactNode } from 'react';

/**
 * Types and interfaces
 */
interface IconButtonProps extends PressableProps {
  /**
   * Icon to show
   */
  icon: React.FC<SvgProps>;
  /**
   * (Optional) Size of the icon
   * @default [20]
   */
  size?: number;
}

/**
 * Helpers
 */

/**
 * Button with Icon
 * @param {IconButtonProps} props Props for the component
 * @returns {ReactNode} Button component
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  size = 20,
  ...props
}: IconButtonProps): ReactNode => {
  const hitSlopValue = size * 1.1;
  return (
    <Pressable
      android_ripple={{
        borderless: true,
        foreground: true,
        radius: hitSlopValue,
        color: 'rgba(0, 0, 0, 0.2)',
      }}
      hitSlop={{
        top: hitSlopValue,
        bottom: hitSlopValue,
        left: hitSlopValue,
        right: hitSlopValue,
      }}
      {...props}
    >
      <View als="center">
        <Icon width={size} height={size} />
      </View>
    </Pressable>
  );
};
