/**
 * @name QwarkToastProvider
 *
 * @description
 * Provider for the toast messages across Qwark app.
 * Wrap the entire app with this provider.
 */

/**
 * Imports
 */
// React and RN
import { FC, PropsWithChildren, ReactNode } from 'react';

// Libraries providing UI-related utils (e.g. tamagui, form etc.)
import { ToastProvider, ToastProviderProps, ToastViewport } from '@tamagui/toast';

// Local (e.g. this and other workspaces)
import { QwarkToast } from './QwarkToast';

/**
 * Toast provider component which provides a vieweport to show the message
 * @param {ToastProviderProps} props - Props for the component
 * @returns {ReactNode} React component
 */
export const QwarkToastProvider: FC<PropsWithChildren<ToastProviderProps>> = ({
  children,
  duration = 2000,
  swipeDirection = 'horizontal',
}: ToastProviderProps): ReactNode => {
  return (
    <ToastProvider duration={duration} swipeDirection={swipeDirection}>
      {children}
      <QwarkToast />
      <ToastViewport fd="column" left="$0" right="$0" bottom="$18" />
      <ToastViewport fd="column" left="$0" right="$0" top="$5" name="top" />
    </ToastProvider>
  );
};
