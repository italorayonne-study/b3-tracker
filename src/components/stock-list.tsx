import { CardHorizontalStock } from '@/src/components/stock';
import { Stocks } from '@/src/types';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export function StockList() {
    const [isLoading, setLoading] = useState(true);
    const [stocks, setStocks] = useState<Stocks[]>([])

    async function getStocks() {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}quote/list?limit=15`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${process.env.EXPO_PUBLIC_TOKEN_KEY}`
                }
            })

            const result = await response.json()
            setStocks(result["stocks"])

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
        <View className='justify-center items-center flex-1'>

            {
                isLoading ? (
                    <ActivityIndicator size={"large"} color={"gray"} />
                ) : (

                    stocks.length !== 0 ?

                        <FlatList
                            data={stocks}
                            renderItem={({ item }) => <CardHorizontalStock stock={item} />}
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