/**
 * @name CustomCard
 *
 * @description
 * Card wrapper component with border and color
 */

/**
 * Imports
 */
// React and RN
import { ReactNode } from 'react';

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { View, ViewProps } from 'tamagui';

// Local (e.g. this and other workspaces)
import { ShadowWrapper } from '../misc/ShadowWrapper';

/**
 * Types and interfaces
 */
interface CustomCardProps extends ViewProps {}

/**
 * Helpers
 */

/**
 * Custom card component
 * @returns {ReactNode} React component
 */
export const CustomCard: React.FC<CustomCardProps> = ({ children, ...props }): ReactNode => {
  return (
    <ShadowWrapper size="sm">
      <View borderRadius="$3" backgroundColor="$qwark/white" {...props}>
        {children}
      </View>
    </ShadowWrapper>
  );
};
