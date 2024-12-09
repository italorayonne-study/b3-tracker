import { useQuoteRepository } from '@/src/hooks/useQuoteRepository';
import { QuoteDatabase } from '@/src/types';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export function StockList() {
    const [isLoading, setLoading] = useState(true);
    const [stocks, setStocks] = useState<QuoteDatabase[]>([])

    const quoteRepository = useQuoteRepository()

    async function getStocks() {
        try {
            const response = await quoteRepository.findAll();

            const result = response
            setStocks(result ?? [])

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getStocks()
    }, [stocks])

    return (
        <View className='justify-center items-center flex-1'>

            {
                isLoading ? (
                    <ActivityIndicator size={"large"} color={"gray"} />
                ) : (

                    stocks.length !== 0 ?

                        <FlatList
                            data={stocks}
                            renderItem={({ item }) => (
                                <Text>{item.name}</Text>
                            )}
                            horizontal={true}
                            contentContainerStyle={{ gap: 14 }}
                            showsHorizontalScrollIndicator={false}

                        /> : <View className='flex-row justify-center items-center'>
                            <Text className='font-semibold text-center w-full'>Sem favoritos</Text>
                        </View>
                )
            }

        </View>
    )
}