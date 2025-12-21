import React from "react";
import { Stack } from "expo-router";
import { screenOptions } from "navigation/screenOptions";
import { CustomHeader } from "navigation/CustomHeader";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        ...screenOptions,
        header: (props) => <CustomHeader {...props} size="$medium" weight="$primary" />,
      }}
    >
      <Stack.Screen
        name="cashflow"
        options={{
          title: "Cashflow",
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
}
