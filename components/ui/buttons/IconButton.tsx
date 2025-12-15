/**
 * Imports
 */
import { Pressable, PressableProps } from "react-native";
import { ReactNode } from "react";
import { Icon } from "../icons";
import { IconProps } from "../icons/types";
import { getIconSize } from "../icons/getIconSize";

/**
 * Types and interfaces
 */
interface IconButtonProps extends PressableProps, IconProps {}

/**
 * Button with Icon
 * @param {IconButtonProps} props Props for the component
 * @returns {ReactNode} Button component
 */
export const IconButton: React.FC<IconButtonProps> = ({
  name,
  size = "md",
  color = "$qwark/black",
  ...props
}: IconButtonProps): ReactNode => {
  const hitSlopValue = getIconSize(size);
  return (
    <Pressable
      android_ripple={{
        borderless: true,
        foreground: true,
        radius: hitSlopValue,
        color: "rgba(0, 0, 0, 0.2)",
      }}
      role="button"
      hitSlop={{
        top: hitSlopValue,
        bottom: hitSlopValue,
        left: hitSlopValue,
        right: hitSlopValue,
      }}
      {...props}
    >
      <Icon name={name} size={size} color={color} />
    </Pressable>
  );
};
