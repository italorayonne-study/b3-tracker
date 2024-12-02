import { Stocks } from '@/src/types';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function Search() {
    const { searchText } = useLocalSearchParams()
    const [isLoading, setLoading] = useState(true);
    const [stocks, setStocks] = useState<Stocks[]>([])


    async function getStocks() {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}quote/list?search=${searchText}&limit=5`, {
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

        if (searchText === '') {
            setStocks([])
        } else {
            getStocks()
        }
    }, [searchText])

    useFocusEffect(
        useCallback(() => router.setParams({
            searchText: ''
        })
            , [])
    )
    return (
        <View className='flex-1 justify-start items-start bg-white p-5'>


            {
                stocks.length !== 0 ? (
                    <View className='flex-1 w-full'>
                        {
                            isLoading ? (<ActivityIndicator size={"large"} color={"gray"} />) : (

                                <FlatList
                                    data={stocks}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            className="flex flex-row bg-gray-100  flex-1 mb-5 w-auto h-28 justify-between items-center rounded-lg"
                                            onPress={() => router.navigate({
                                                pathname: "/details/[quote]",
                                                params: {
                                                    quote: item.logo,
                                                    name: item.name,
                                                    stock: item.stock,
                                                    close: item.close,
                                                    change: item.change,
                                                    sector: item.sector,
                                                    volume: item.volume,
                                                    market_cap: item.market_cap
                                                }
                                            })}
                                        >
                                            <Image
                                                source={{
                                                    uri: `${item.logo}`
                                                }}
                                                style={{
                                                    width: 80,
                                                    height: 80,
                                                    marginRight: 12,
                                                    borderRadius: 8,
                                                }}

                                            />
                                            <View className='flex justify-center items-center'>
                                                <Text className="text-black text-sm font-bold">{item.name}</Text>
                                                <Text className="text-black text-sm font-bold">{item.stock}</Text>

                                            </View>

                                            <View className="flex flex-row mr-2">
                                                <AntDesign name={`${item.change < 0 ? 'caretdown' : 'caretup'}`} size={20} color={`${item.change < 0 ? 'red' : 'green'}`} />
                                                <Text className={`text-sm text-center ml-3 ${item.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                    {
                                                        item.change.toFixed(2)

                                                    }
                                                </Text>
                                            </View>


                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item.stock}
                                    showsVerticalScrollIndicator={false}
                                />
                            )
                        }
                    </View>
                ) : (null)
            }
        </View>
    );
}