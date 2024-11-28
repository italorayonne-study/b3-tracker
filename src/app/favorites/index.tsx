import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function DetailsScreen() {
    return (
        <View className="flex-1 items-center justify-center">
            <Link href={"/details/quote-example"}>Go to Details</Link>
        </View>
    )
}