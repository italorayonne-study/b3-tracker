import { Stocks } from '@/src/types'
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
                volume:stock.volume,
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
            <View>
                {/* <AntDesign name='USB' size={24} /> */}
                <Text className='mt-5'>{stock.name}</Text>
            </View>

        </Pressable>
    )

}