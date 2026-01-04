import React from "react";
import { Stack } from "expo-router";
import { CustomHeader } from "navigation/CustomHeader";
import { screenOptions } from "navigation/screenOptions";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        ...screenOptions,
        header: (props) => <CustomHeader {...props} size="$medium" weight="$primary" />,
      }}
    >
      <Stack.Screen
        name="profile-details"
        options={{
          title: "Personal Details",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="connected-accounts"
        options={{
          title: "Connected Accounts",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
          headerBackVisible: true,
        }}
      />
      <Stack.Screen
        name="account-details"
        options={{
          title: "",
          headerBackVisible: true,
        }}
      />
    </Stack>
  );
}
