/**
 * @name CustomListeItemCard
 *
 * @description
 * Card wrapper component to be used in a list
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
interface CustomListItemCardProps extends ViewProps {}

/**
 * Helpers
 */

/**
 * Custom card to be used as a list item
 * @returns {ReactNode} React component of the card
 */
export const CustomListItemCard: React.FC<CustomListItemCardProps> = ({ children, ...props }): ReactNode => {
  return (
    <ShadowWrapper size="sm">
      <View padding="$3" borderRadius="$3" backgroundColor="$qwark/white" {...props}>
        {children}
      </View>
    </ShadowWrapper>
  );
};
