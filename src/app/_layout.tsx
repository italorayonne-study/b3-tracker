import { initializeDatabase } from "@/src/database/sqlite";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import "../styles/global.css";

export default function RootLayout() {

  return (

    <SQLiteProvider databaseName="sqlite.db" onInit={initializeDatabase}>

      <Stack screenOptions={{
        statusBarStyle: "dark"
      }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="details/[quote]" options={{
            headerShown: true,
            title: "Detalhes",
            headerShadowVisible: false
          }}
        />

        <Stack.Screen
          name="stocks/index" options={{
            headerShown: true,
            title: 'Mercado',
            headerShadowVisible: false
          }}

        />
      </Stack>
    </SQLiteProvider>
  )
}