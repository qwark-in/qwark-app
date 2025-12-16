/**
 * @name QwarkToast
 *
 * @description
 * Component to render toast messages across Qwark app
 */

/**
 * Imports
 */
// React and RN
import React, { ReactNode } from 'react';
import { useWindowDimensions } from 'react-native';

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { XStack, YStack } from 'tamagui';
import { Toast, useToastState } from '@tamagui/toast';
import Constants, { ExecutionEnvironment } from 'expo-constants';

/**
 * Types and interfaces
 */
type QwarkToastParams = {
  /**
   * (Optional) Width of the toast message
   * @default [screenWidth]
   */
  width?: number;
};

/**
 * Helpers
 */
const isExpo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

/**
 * Private component to be consumed in the exported toast component
 * @returns {ReactNode} React component to render toast
 */
const _QwarkToast: React.FC<{ _width: number }> = ({ _width }): ReactNode => {
  const currentToast = useToastState();
  const maxWidth = _width * 0.9; // Maxmimum 90% of screen width
  if (!currentToast || currentToast.isHandledNatively) return null;
  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      enterStyle={{ opacity: 0, scale: 0.5, y: -20 }}
      exitStyle={{ opacity: 0, scale: 0 }}
      y="$0"
      opacity={1}
      scale={1}
      animation="quick"
      viewportName={currentToast.viewportName}
      backgroundColor="$gray/80"
      maxWidth={maxWidth}
      borderRadius="$1"
      px="$4"
      py={14}
    >
      <XStack gap="$2">
        <YStack>
          <Toast.Title
            size="$small"
            ff="$body"
            color="$qwark/white"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {currentToast.title}
          </Toast.Title>

          {!!currentToast.message && (
            <Toast.Description
              pr="$4"
              size="$small"
              fow="$primary"
              ff="$label"
              color="$qwark/white"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {currentToast.message}
            </Toast.Description>
          )}
        </YStack>
      </XStack>
    </Toast>
  );
};

/**
 * Qwark toast component (does not render if it isn't an Expo app development build)
 * @returns {ReactNode} React component
 */
export const QwarkToast: React.FC<QwarkToastParams> = ({ width }: QwarkToastParams): ReactNode => {
  const dims = useWindowDimensions();
  const toastWidth = width === undefined ? dims.width : width;

  if (isExpo) {
    return null;
  } else {
    return <_QwarkToast _width={toastWidth} />;
  }
};
