import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

interface Acao {
  id: string;
  nome: string;
  simbolo: string;
}

// Falta adicionar o resultado da requisição da API na lista 'Acao[]'
const acoesFavoritas: Acao[] = [
  { id: '1', nome: 'Apple Inc.', simbolo: 'AAPL' },
  { id: '2', nome: 'Amazon.com, Inc.', simbolo: 'AMZN' },
];

const TelaFavoritos = () => {
  const [textoPesquisa, setTextoPesquisa] = useState('');
  const router = useRouter();

  const acoesFiltradas = acoesFavoritas.filter((acao) =>
    acao.nome.toLowerCase().includes(textoPesquisa.toLowerCase())
  );

  // Aqui falta colocar a rota correta para o detalhe da ação escolhida !
  const renderItem = ({ item }: { item: Acao }) => (
    <TouchableOpacity
      onPress={() => router.push(`/`)} // `/DetalhesAcao/${item.id}`
      className="p-4 border-b border-gray-200"
    >
      <Text className="text-lg font-semibold">{item.nome}</Text>
      <Text className="text-gray-500">{item.simbolo}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Barra de Pesquisa */}
      <View className="p-4">
        <TextInput
          placeholder="Pesquisar nos favoritos"
          value={textoPesquisa}
          onChangeText={setTextoPesquisa}
          className="border border-gray-300 rounded p-4"
        />
      </View>
      {/* Lista de Ações Favoritas */}
      <FlatList
        data={acoesFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default TelaFavoritos;
