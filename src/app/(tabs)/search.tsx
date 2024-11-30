import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Search() {

    const { searchText } = useLocalSearchParams()

    return (
        <View className='flex-1 items-center justify-center p-5 bg-white '>
            <Text>Texto de Busca: {searchText}</Text>
        </View>
    );
}