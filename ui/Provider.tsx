import { TamaguiProvider, type TamaguiProviderProps } from "tamagui";
import { config } from "../tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QwarkToastProvider } from "ui/feedback/toasts";

export function Provider({ children, ...rest }: Omit<TamaguiProviderProps, "config">) {
  return (
    <TamaguiProvider config={config} defaultTheme={"light"} {...rest}>
      <QwarkToastProvider>
        <KeyboardProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
          </GestureHandlerRootView>
        </KeyboardProvider>
      </QwarkToastProvider>
    </TamaguiProvider>
  );
}
