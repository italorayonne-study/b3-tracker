import { useEffect, useRef } from "react";
import { Animated, Dimensions, Text, View } from "react-native";

const { width: screenWidth } = Dimensions.get('window');

const initialStockData = [
    { name: 'AAPL', value: '$150.25' },
    { name: 'TSLA', value: '$220.10' },
    { name: 'AMZN', value: '$135.55' },
    { name: 'GOOG', value: '$2800.45' },
    { name: 'MSFT', value: '$320.75' },
];


export default function ContinuousCarousel() {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef(null);

    // Duplicar os dados para criar o loop
    const data = [...initialStockData, ...initialStockData];

    useEffect(() => {
        let isMounted = true;

        const startScrolling = () => {
            if (!isMounted || !scrollViewRef.current) return;

            Animated.timing(scrollX, {
                toValue: screenWidth * data.length, // Rola até o final dos itens duplicados
                duration: data.length * 3000, // Controle de velocidade (3s por item)
                useNativeDriver: true,
            }).start(() => {
                // Reseta para o início sem pausa
                if (isMounted && scrollViewRef.current) {
                    scrollX.setValue(0); // Reseta para o começo
                    startScrolling(); // Reinicia o loop
                }
            });
        };

        startScrolling();

        return () => {
            isMounted = false;
        };
    }, [data, scrollX]);

    return (
        <View className="h[100] justify-center bg-slate-200">
            <Animated.ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false} // Desabilita rolagem manual
                contentContainerStyle={{ flexDirection: 'row' }}
                style={{ transform: [{ translateX: scrollX }] }} // Move a rolagem
            >
                {data.map((item, index) => (
                    <View key={index} className={`w-7 bg-white rounded-lg p-5 justify-center items-center elevation`}>
                        <Text>{item.name}</Text>
                        <Text>{item.value}</Text>
                    </View>
                ))}
            </Animated.ScrollView>
        </View>
    );
}