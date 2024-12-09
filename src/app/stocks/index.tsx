import { StockList } from "@/src/components/stock-list";
import { useQuoteRepository } from "@/src/hooks/useQuoteRepository";
import { Stocks } from "@/src/types";
import { highlightStocks } from "@/src/utils";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text, TouchableOpacity, View } from "react-native";

export default function StocksScreem() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Stocks[]>([])

    const highlightedStocks = highlightStocks(data)

    const stocksWithHighlight = data.map(stock => ({
        ...stock,
        highlighted: highlightedStocks.some(highlight => highlight.stock === stock.stock)
    }));


    async function getStocks() {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}quote/list?limit=`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${process.env.EXPO_PUBLIC_TOKEN_KEY}`
                }
            })

            const result = await response.json()
            setData(result["stocks"])

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStocks()
    }, [])

    return (
        <View className="flex-1 justify-start items-start bg-white p-5">
            <Text className="text-xl font-semibold mb-4">Títulos Favoritados</Text>
            <View className="h-36">
                <StockList />

                <TouchableOpacity
                    className="flex-row items-center justify-center bg-[#E57748] px-6 py-3 rounded-lg"
                    onPress={async () => useQuoteRepository().remove()}
                >
                    <Text className="text-white text-lg font-bold mr-3">Remover todos</Text>
                    <AntDesign name="staro" size={24} color="white" />
                </TouchableOpacity>


            </View>

            <Text className="text-xl font-semibold mt-10 mb-5">Destaques</Text>

            <View className="flex-1 w-full">

                {
                    isLoading ? (<ActivityIndicator size={"large"} color={"gray"} />) : (

                        <FlatList
                            data={stocksWithHighlight}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="flex flex-row bg-gray-100  flex-1 mb-5 w-auto h-28 justify-between items-center rounded-lg"
                                    onPress={() => router.navigate({
                                        pathname: "/details/[quote]",
                                        params: {
                                            quote: item.logo,
                                            name: item.name,
                                            stock: item.stock,
                                            close: item.close,
                                            change: item.change,
                                            sector: item.sector,
                                            volume: item.volume,
                                            market_cap: item.market_cap
                                        }
                                    })}
                                >
                                    <Image
                                        source={{
                                            uri: `${item.logo}`
                                        }}
                                        style={{
                                            width: 80,
                                            height: 80,
                                            marginRight: 12,
                                            borderRadius: 8,
                                        }}

                                    />
                                    <Text className="text-black text-sm font-bold">{item.name}</Text>

                                    <View className="flex flex-row mr-2">
                                        <AntDesign name={`${item.change < 0 ? 'caretdown' : 'caretup'}`} size={20} color={`${item.change < 0 ? 'red' : 'green'}`} />
                                        <Text className={`text-sm text-center ml-3 ${item.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                            {
                                                item.change.toFixed(2)

                                            }
                                        </Text>
                                    </View>


                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.stock}
                            showsVerticalScrollIndicator={false}
                        />
                    )
                }
            </View>
        </View>
    )
}