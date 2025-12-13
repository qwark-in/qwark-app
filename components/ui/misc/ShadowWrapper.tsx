/**
 * @name ShadowWrapper
 *
 * @description
 * Wrapper component that adds a specified shadow to the wrapped component
 */

/**
 * Imports
 */
// React and RN
import { ReactNode } from 'react';

// Local (e.g. this and other workspaces)
import { View, ViewProps } from 'tamagui';

/**
 * Types and interfaces
 */
type ShadowSizeType = 'sm' | 'md' | 'md-top' | 'lg' | 'xl' | '2xl' | '3xl';

interface ShadowWrapperProps extends ViewProps {
  /**
   * Shadow size. Can be one of 'sm', 'md', 'md-top', 'lg', 'xl', '2xl' or '3xl'
   */
  size: ShadowSizeType;
  /**
   * (Optional) Disabled or not
   *
   */
  disabled?: boolean;
}

/**
 * Shadow size to value map
 */

const shadowVariants: Record<ShadowSizeType, string> = {
  sm: '0px 0px 12px 0px rgba(22, 22, 22, 0.08)',
  md: '0px 2px 16px 0px rgba(22, 22, 22, 0.12)',
  'md-top': '0px -2px 16px 0px rgba(22, 22, 22, 0.12)',
  lg: '0px 8px 24px 0px rgba(22, 22, 22, 0.16)',
  xl: '0px 12px 32px 0px rgba(22, 22, 22, 0.20)',
  '2xl': '0px 16px 48px 0px rgba(22, 22, 22, 0.24)',
  '3xl': '0px 24px 64px 0px rgba(22, 22, 22, 0.28)',
};

/**
 * Wrapper component to add shadow
 * @param {ShadowWrapperProps} props - Params for the component
 * @returns {ReactNode} - React component
 */
export const ShadowWrapper: React.FC<ShadowWrapperProps> = ({
  size = 'md',
  disabled = false,
  children,
  ...rest
}: ShadowWrapperProps): ReactNode => {
  if (disabled) {
    return children;
  }

  return (
    <View boxShadow={shadowVariants[size]} {...rest}>
      {children}
    </View>
  );
};
