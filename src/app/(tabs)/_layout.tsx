import { AntDesign } from "@expo/vector-icons";
import { router, Tabs, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { TextInput, View } from "react-native";

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
                tabBarLabel: () => null,
                tabBarActiveTintColor: "#e57748",
                tabBarHideOnKeyboard: true
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
                    headerTitleContainerStyle: {
                        display: "none"
                    },
                    headerShown: true,
                    headerStyle: {
                        borderBottomWidth: 0,
                        shadowColor: "transparent",
                    },

                    tabBarIcon: ({ color }) => (
                        <AntDesign name="search1" size={28} color={color} />
                    ),
                    headerRight: () => {
                        const [search, setSearch] = useState('')

                        function handleSearch() {

                            if (search.trim() !== '')
                                router.setParams({
                                    searchText: search
                                })
                        }

                        useFocusEffect(
                            useCallback(() => setSearch('')
                                , [])
                        )

                        return (

                            <View className='w-4/5 m-auto flex-row border border-gray-500 h-14 rounded-xl items-center justify-center gap-2 px-4 bg-transparent'>
                                <AntDesign name='search1' size={24} color="#64748b" />

                                <TextInput
                                    placeholder="Busca"
                                    className='w-full h-10 flex-1 bg-transparent'
                                    value={search}
                                    onChangeText={setSearch}
                                    onSubmitEditing={handleSearch}
                                />
                            </View>
                        )
                    }
                }}
            />

            <Tabs.Screen
                name="favorites"
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="staro" size={28} color={color} />
                    )
                }}
            />
        </Tabs>
    )
}