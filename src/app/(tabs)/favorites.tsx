// import React, { useState } from 'react';
// import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native';
// import { useRouter } from 'expo-router';

// // export default function DetailsScreen() {
// //   return (
// //       <View className="flex-1 items-center justify-center">
// //           <Link href={"/details/quote-example"}>Go to Details</Link>
// //       </View>
// //   )
// // }

// interface Acao {
//   id: string;
//   nome: string;
//   simbolo: string;
// }

// // Falta adicionar nessa lista, as ações favoritas pelo usuário na tela de "Detalhes" da ação pesquisada 
// const acoesFavoritas: Acao[] = [
//   { id: '1', nome: 'Apple Inc.', simbolo: 'AAPL' },
//   { id: '2', nome: 'Amazon.com, Inc.', simbolo: 'AMZN' },
// ];

// const TelaFavoritos = () => {
//   const [textoPesquisa, setTextoPesquisa] = useState('');
//   const router = useRouter();

//   const acoesFiltradas = acoesFavoritas.filter((acao) =>
//     acao.nome.toLowerCase().includes(textoPesquisa.toLowerCase())
//   );

//   // Aqui falta colocar a rota correta para o detalhe da ação escolhida !
//   const renderItem = ({ item }: { item: Acao }) => (
//     <TouchableOpacity
//       onPress={() => router.push(`/`)} // `/DetalhesAcao/${item.id}`
//       className="p-4 border-b border-gray-200"
//     >
//       <Text className="text-lg text-[#1b38a9] font-semibold">{item.nome}</Text>
//       <Text className="text-gray-700">{item.simbolo}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View className="flex-1 bg-white">
//       {/* Barra de Pesquisa */}
//       <View className="p-4">
//         <TextInput
//           placeholder="Pesquisar nos favoritos"
//           value={textoPesquisa}
//           onChangeText={setTextoPesquisa}
//           className="border border-[#e57748] rounded p-4 text-lg text-gray-400"
//         />
//       </View>
//       {/* Lista de Ações Favoritas */}
//       <FlatList
//         data={acoesFiltradas}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         className='p-3'
//       />
//     </View>
//   );
// };

// export default TelaFavoritos;

import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Acao {
  id: string;
  nome: string;
  simbolo: string;
}

const TelaFavoritos = () => {
  const [acoesFavoritas, setAcoesFavoritas] = useState<Acao[]>([
    { id: '1', nome: 'Apple Inc.', simbolo: 'AAPL' },
    { id: '2', nome: 'Amazon.com, Inc.', simbolo: 'AMZN' },
  ]);
  const [textoPesquisa, setTextoPesquisa] = useState('');
  const [modoSelecao, setModoSelecao] = useState(false);
  const [itensSelecionados, setItensSelecionados] = useState<string[]>([]);
  const router = useRouter();

  const acoesFiltradas = acoesFavoritas.filter((acao) =>
    acao.nome.toLowerCase().includes(textoPesquisa.toLowerCase())
  );

  const handleDesfavoritar = (id: string) => {
    setAcoesFavoritas(prevAcoes => prevAcoes.filter(acao => acao.id !== id));
  };

  const handleSelecionarItem = (id: string) => {
    setItensSelecionados(prevSelecionados => {
      if (prevSelecionados.includes(id)) {
        return prevSelecionados.filter(itemId => itemId !== id);
      } else {
        return [...prevSelecionados, id];
      }
    });
  };

  const handleSelecionarTodos = () => {
    if (itensSelecionados.length === acoesFiltradas.length) {
      setItensSelecionados([]);
    } else {
      setItensSelecionados(acoesFiltradas.map(item => item.id));
    }
  };

  const handleExcluirSelecionados = () => {
    if (itensSelecionados.length === 0) {
      Alert.alert('Aviso', 'Nenhum item selecionado.');
      return;
    }
    Alert.alert(
      'Confirmação',
      'Essa ação irá excluir os itens selecionados da lista de favoritos. Quer continuar?',
      [
        { text: 'NÃO', onPress: () => null, style: 'cancel' },
        {
          text: 'SIM',
          onPress: () => {
            setAcoesFavoritas(prevAcoes =>
              prevAcoes.filter(acao => !itensSelecionados.includes(acao.id))
            );
            setItensSelecionados([]);
            setModoSelecao(false);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Acao }) => (
    <TouchableOpacity
      onPress={() => {
        if (modoSelecao) {
          handleSelecionarItem(item.id);
        } else {
          router.push(`/`); // Substitua `/` pela rota correta
        }
      }}
      className="p-4 border-b border-gray-200 flex-row justify-between items-center"
    >
      {modoSelecao && (
        <Icon
          name={
            itensSelecionados.includes(item.id)
              ? 'check-box'
              : 'check-box-outline-blank'
          }
          size={24}
          color="#e57748"
        />
      )}
      <View style={{ flex: 1, marginLeft: modoSelecao ? 10 : 0 }}>
        <Text className="text-lg text-[#1b38a9] font-semibold">{item.nome}</Text>
        <Text className="text-gray-700">{item.simbolo}</Text>
      </View>
      {!modoSelecao && (
        <TouchableOpacity onPress={() => handleDesfavoritar(item.id)}>
          <Icon name="close" size={24} color="red" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Cabeçalho */}
      <View className="flex-row justify-center items-center p-4">
        <Text className="text-xl font-bold">Favoritos</Text>
      </View>
      {/* Barra de Pesquisa */}
      <View className="p-4">
        <TextInput
          placeholder="Pesquisar nos favoritos"
          value={textoPesquisa}
          onChangeText={setTextoPesquisa}
          className="border border-[#e57748] rounded p-4 text-lg text-gray-400"
        />
      </View>
      {/* Botão de Selecionar */}
      <View className="p-4">
        <TouchableOpacity
          onPress={() => setModoSelecao(!modoSelecao)}
          className="flex-row items-center"
        >
          <Icon name="select-all" size={24} color="#e57748" />
          <Text style={{ color: '#e57748', marginLeft: 8 }}>
            {modoSelecao ? 'Cancelar' : 'Selecionar'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Botões de Selecionar Todos e Excluir */}
      {modoSelecao && (
        <View className="flex-row justify-between items-center p-4">
          <TouchableOpacity
            onPress={handleSelecionarTodos}
            className="flex-row items-center"
          >
            <Icon
              name={
                itensSelecionados.length === acoesFiltradas.length
                  ? 'check-box'
                  : 'check-box-outline-blank'
              }
              size={24}
              color="#e57748"
            />
            <Text style={{ color: '#e57748', marginLeft: 8 }}>
              {itensSelecionados.length === acoesFiltradas.length
                ? 'Desmarcar Todos'
                : 'Selecionar Todos'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleExcluirSelecionados}>
            <Text style={{ color: 'red' }}>Excluir Selecionados</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Lista de Ações Favoritas */}
      <FlatList
        data={acoesFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        className="p-3"
        extraData={itensSelecionados}
      />
    </View>
  );
};

export default TelaFavoritos;
