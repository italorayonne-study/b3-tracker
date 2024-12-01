import { CardHorizontalStock } from '@/src/components/stock';
import { Stocks } from '@/src/types';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from "react-native";

export function StockList() {
    const [isLoading, setLoading] = useState(true);
    const [stocks, setStocks] = useState<Stocks[]>([])

    async function getStocks() {
        try {
            const response = await fetch('https://brapi.dev/api/quote/list?limit=5', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer popeYQfXMTauF2XpUzobK4d'
                }
            })

            const result = await response.json()
            setStocks(result["stocks"])

            console.log(stocks)

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
        <View className='flex-1 justify-center items-center p-5 bg-white'>

            {
                isLoading ? (
                    <ActivityIndicator size={"large"} color={"gray"} />
                ) : (
                    <FlatList
                        data={stocks}
                        renderItem={({ item }) => <CardHorizontalStock stock={item} />}
                        horizontal={true}
                        contentContainerStyle={{ gap: 14, paddingLeft: 16, paddingRight: 16 }}
                        showsHorizontalScrollIndicator={false}

                    />
                )
            }

        </View>
    )
}