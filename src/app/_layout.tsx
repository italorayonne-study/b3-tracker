import { Stack } from "expo-router";

import "../styles/global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{
      statusBarStyle: "dark"
    }}>
      <Stack.Screen name="(tabs)"
        options={{
          headerShown: false,
        }} />
    </Stack>
  )
}