import { Tabs } from "expo-router";
import { Atom, AudioWaveform } from "@tamagui/lucide-icons";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="one"
        options={{
          title: "Tab One",
          tabBarIcon: ({ color }) => <Atom color={color as any} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <AudioWaveform color={color as any} />,
        }}
      />
    </Tabs>
  );
}
