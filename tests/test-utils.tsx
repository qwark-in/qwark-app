import React from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { TamaguiProvider } from "tamagui";
import { config } from "../tamagui.config";

const AllTheProviders = ({ children }) => {
  return (
    <TamaguiProvider config={config} defaultTheme="light">
      {children}
    </TamaguiProvider>
  );
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react-native";

// override render method
export { customRender as render };
