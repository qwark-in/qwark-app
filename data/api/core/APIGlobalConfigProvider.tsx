/**
 * @name APIGlobalConfigProvider
 *
 * @description
 * Provider for data fetching APIs using SWR (stale-while-revalidate) pattern
 * (These APIs use vercel's swr library)
 */

/**
 * Imports
 */
// React and RN
import { FC, PropsWithChildren } from "react";
import { AppState, AppStateStatus } from "react-native";
import NetInfo from "@react-native-community/netinfo";

// Libraries
import { SWRConfig } from "swr";
import { createMMKV } from "react-native-mmkv";

// Local (e.g. this and other workspaces)
import { useIsOnline } from "hooks/use-is-online";
import { setupSWRCache } from "./swr-cache";

/**
 * Types and interfaces
 */

/**
 * Component which provides mmkv synchronous persistent storage to all APIs
 * @returns React component
 */
const mmkvProvider = () => {
  const storage = createMMKV();
  const { swrCacheMap, persistCache } = setupSWRCache({
    set: storage.set.bind(storage),
    get: storage.getString.bind(storage),
  });

  AppState.addEventListener("change", function persistCacheOnAppBackground(s) {
    if (s === "background") {
      persistCache();
    }
  });

  return swrCacheMap;
};

/**
 * A context provider component to wrap the app around for accessing
 * the swr library's common config
 * @param props Props of the component (children in this case)
 * @returns React context provider component
 */
export const APIGlobalConfigProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { isOnline } = useIsOnline();

  return (
    <SWRConfig
      value={{
        provider: mmkvProvider,
        isOnline: () => {
          return isOnline;
        },
        isVisible: () => {
          return AppState.currentState === "active";
        },
        initFocus(callback) {
          let appState = AppState.currentState;

          const onAppStateChange = (nextAppState: AppStateStatus) => {
            /* If it's resuming from background or inactive mode to active one */
            if (
              /**
               * Stricter check, conservative init focus -
               * no need to check if the app's current state is
               * either "inactive" or "background", do init focus stuff anyway
               */
              // appState.match(/inactive|background/) &&
              nextAppState === "active"
            ) {
              callback();
            }
            appState = nextAppState;
          };

          // Subscribe to the app state change events
          const subscription = AppState.addEventListener(
            "change",
            onAppStateChange
          );

          return () => {
            if (subscription) {
              subscription.remove();
            }
          };
        },
        initReconnect(callback) {
          const unsubscribe = NetInfo.addEventListener((s) => {
            if (s.isInternetReachable && s.isConnected) {
              callback();
            }
          });

          return unsubscribe;
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
