import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
    return (
        <View className="flex-1 items-center justify-center p-5 bg-white">
            <Image
                className=""
                source={require("@/src/assets/images/b3-tracker-logo.png")}
                style={{
                    width: 200,
                    height: 200
                }}
                resizeMode="contain"
            />
            <View>
                <Text className="text-5xl text-center font-bold mb-4 text-black">
                    Bem-vindo ao <Text className="text-orange-600">B3 {"\n"} Tracker!</Text>
                </Text>
                <Text className="text-xl text-center text-gray-700">
                    Acompanhe as ações da bolsa em tempo real, favorite os seus índices e tome decisões mais inteligentes.
                </Text>

            </View>

            <View className="flex-1 justify-center items-center" >
                <TouchableOpacity
                    className="flex-row items-center bg-[#E57748] px-6 py-3 rounded-lg"
                    onPress={() => router.push("/stocks")}
                >
                    <AntDesign name="arrowright" size={20} color="white" className="mr-3" />
                    <Text className="text-white text-lg font-bold">Comece agora</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}