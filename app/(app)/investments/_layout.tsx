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
        name="sip-details"
        options={{
          title: "SIP Details",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="stock-details"
        options={{
          title: "Investment Details",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="mf-details"
        options={{
          title: "Investment Details",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="fd-details"
        options={{
          title: "Investment Details",
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
}
