import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

type SearchInputProps = {
    onSearch: (value: string) => void
}

export default function SearchInput({ onSearch }: SearchInputProps) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchText);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Digite sua busca..."
                    value={searchText}
                    onChangeText={setSearchText}
                    returnKeyType="search"
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Buscar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
