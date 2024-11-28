import { AntDesign } from '@expo/vector-icons';
import { Tabs } from "expo-router";

import "../styles/global.css";

export default function RootLayout() {
  return <Tabs>
    <Tabs.Screen
      name="index"
      options={{
        headerShown: false,
        title: 'Home',
        tabBarIcon: ({ focused, color, size }) => {
          return <AntDesign name="home" size={size} color={color} />
        }
      }} />

    <Tabs.Screen
      name='search'
      options={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        title: 'Buscar',
        tabBarIcon: ({ color, focused, size }) => {
          return <AntDesign name='search1' size={size} color={color} />
        }
      }}
    />

    <Tabs.Screen
      name="favorites"
      options={{
        headerShown: false,
        title: "Favoritos",
        tabBarIcon: ({ focused, color, size }) => {
          return <AntDesign name="staro" size={size} color={color} />
        },
      }} />
  </Tabs>;
}
