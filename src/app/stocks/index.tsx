import { StockList } from "@/src/components/stock-list";
import { Text, View } from "react-native";

export default function StocksScreem() {
    return (
        <View className="flex-1 justify-start items-start bg-white p-5">
            <Text className="text-xl font-semibold mb-4">Títulos Favoritados</Text>
            <View className="h-36">
                <StockList />
            </View>

            <Text className="text-xl font-semibold mt-10">Destaques</Text>
        </View>
    )
}