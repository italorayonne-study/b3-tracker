import { Image, Text, View } from "react-native";

export default function HomeScreen() {
    return (
        <View className="flex-1 items-center justify-center p-5 bg-white ">
            <Image
                className=""
                source={require("@/src/assets/images/b3-tracker-logo.png")}                
                style={{
                    width: 200,
                    height: 200
                }}
                resizeMode="contain"
            />
            <Text className="text-3xl font-bold mb-1 text-[#1b38a9]">Bem vindo à B3 Tracker!</Text>
            <Text className="text-1xl text-center text-gray-800">Sua Plataforma de Informações em Tempo Real</Text>
        </View>
    )
}