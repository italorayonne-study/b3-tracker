import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    height: 80,
                    borderTopWidth: 0,
                    shadowColor: "transparent",
                },
                tabBarItemStyle: {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                },
                
                tabBarLabel: () => null
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="home" size={28} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="search"
                options={{
                    title: "Pesquisa",
                    headerShown: true,
                    tabBarIcon: () => (
                        <AntDesign name="search1" size={28} />
                    )
                }}
            />

            <Tabs.Screen
                name="favorites"
                options={{
                    title: "Favoritos",
                    headerShown: true,
                    tabBarIcon: () => (
                        <AntDesign name="staro" size={28} />
                    )
                }}
            />
        </Tabs>
    )
}