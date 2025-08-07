// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";
import "./global.css";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Devices" }} />
      <Stack.Screen
        name="devices/[id]"
        options={{ title: "Assembly Line 1" }}
      />
      <Stack.Screen
        name="devices/[id]/[detailId]"
        options={{ title: "Main Conveyor Motor" }}
      />
    </Stack>
  );
}
