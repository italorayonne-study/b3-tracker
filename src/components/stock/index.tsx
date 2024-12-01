import { Stocks } from '@/src/types'
import { AntDesign } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export function CardHorizontalStock({ stock }: { stock: Stocks }) {
    return (
        <Pressable className='flex flex-col rounded-xl' onPress={() => router.navigate({
            pathname: "/details/[quote]",
            params: {
                quote: stock.logo,
                name: stock.name,
                stock: stock.stock,
                close: stock.close,
                change: stock.change,
                sector: stock.sector,
                volume: stock.volume,
                market_cap: stock.market_cap
            }
        })}>
            <View className='flex-1'>
                <Image
                    source={{
                        uri: `${stock.logo}`
                    }}
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 12
                    }}
                />
            </View>
            <View className='flex flex-row bg-neutral-900/90 items-center justify-start gap-2'>

                <AntDesign name={`${stock.change < 0 ? 'caretdown' : 'caretup'}`} size={20} color={`${stock.change < 0 ? 'red' : 'green'}`} />

                <Text className={`text-sm text-center ml-3 ${stock.change < 0 ? 'text-red-500' :  'text-green-500'}`}>
                    {
                        stock.change.toFixed(2)

                    }
                </Text>
            </View>

        </Pressable>
    )
}