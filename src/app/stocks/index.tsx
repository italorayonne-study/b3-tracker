import { StockList } from "@/src/components/stock-list";
import { Text, View } from "react-native";

export default function StocksScreem() {
    return (
        <View className="flex-1 justify-start items-center bg-white p-5">
            <View className="h-44">
                <StockList />
            </View>
        </View>
    )
}