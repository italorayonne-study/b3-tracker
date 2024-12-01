import { AntDesign } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function StockDetailsScreen() {
    const {
        quote,
        name,
        stock,
        close,
        change,
        sector,
        volume,
        market_cap
    } = useLocalSearchParams()
    return (
        <View className="flex-1 justify-between p-5 bg-white">
            <View className="flex flex-row">
                <Image
                    source={{ uri: `${quote}` }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 16
                    }}

                />
                <View className="ml-2 w-3/4">
                    <Text className="text-3xl font-bold">{name}</Text>
                    <Text className="text-lg text-gray-500">{stock}</Text>
                </View>
            </View>

            <View className="mt-10 flex-1">
                <Text className="text-4xl font-bold">R$ {close}</Text>
                <Text className={`text-lg ${parseFloat(change.toString()) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {parseFloat(change.toString()) > 0 ? `+${parseFloat(change.toString()).toFixed(2)}%` : `${parseFloat(change.toString()).toFixed(2)}%`}
                </Text>
            </View>

            <View className="mt-6">
                <View className="flex-row justify-between">
                    <Text className="text-1xl text-gray-500">Setor</Text>
                    <Text className="text-lg font-semibold">{sector}</Text>
                </View>
                <View className="flex-row justify-between mt-3">
                    <Text className="text-1xl text-gray-500">Volume</Text>
                    <Text className="text-lg font-semibold">{volume}</Text>
                </View>
                <View className="flex-row justify-between mt-3">
                    <Text className="text-1xl text-gray-500">Capitalização de Mercado</Text>
                    <Text className="text-lg font-semibold">R$ {parseFloat(market_cap?.toString()).toFixed(2)}</Text>
                </View>
            </View>

            <View className="p-4 mt-5">
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