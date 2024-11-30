import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Stocks = {
    stock: string;
    name: string;
    close: number;
    change: number;
    volume: number;
    market_cap: number;
    logo: string;
    sector: string;
    type: string;
}

export default function StockDetailsScreen() {
    const { quote } = useLocalSearchParams()

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Stocks[]>([])

    async function getStocks() {
        try {
            const response = await fetch('', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer xyz'
                }
            })

            const result = await response.json()
            setData(result)

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStocks
    }, [])

    return (
        <View className="flex-1 justify-between p-5 bg-white">
            <View className="flex flex-row">
                <Image
                    source={{ uri: "https://github.com/italorayone.png" }}
                    width={75}
                    height={75}
                    className="rounded-2xl"
                />
                <View className="ml-2 w-3/4">
                    <Text className="text-3xl font-bold">Petróleo Brasileiro S.A.</Text>
                    <Text className="text-lg text-gray-500">{quote}</Text>
                </View>
            </View>

            <View className="mt-10 flex-1">
                <Text className="text-4xl font-bold">R$ 58,68</Text>
                <Text className={`text-lg ${1.37 < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {1.37 > 0 ? `+${1.37}%` : `${1.37}%`}
                </Text>
            </View>

            <View className="mt-6">
                <View className="flex-row justify-between">
                    <Text className="text-1xl text-gray-500">Setor</Text>
                    <Text className="text-lg font-semibold">Energy Minerals</Text>
                </View>
                <View className="flex-row justify-between mt-3">
                    <Text className="text-1xl text-gray-500">Volume</Text>
                    <Text className="text-lg font-semibold">52.313.200</Text>
                </View>
                <View className="flex-row justify-between mt-3">
                    <Text className="text-1xl text-gray-500">Capitalização de Mercado</Text>
                    <Text className="text-lg font-semibold">R$ 1.013.530.585,57</Text>
                </View>
            </View>

            <View className="p-4">
                <TouchableOpacity
                    className="flex-row items-center justify-center bg-[#E57748] px-6 py-3 rounded-lg"
                    onPress={() => { /* Lógica para favoritar */ }}
                >
                    <Text className="text-white text-lg font-bold mr-3">Favoritar</Text>
                    <AntDesign name="staro" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}