import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Acao {
  id: string;
  nome: string;
  simbolo: string;
}

const TelaFavoritos: React.FC = () => {
  const [acoesFavoritas, setAcoesFavoritas] = useState<Acao[]>([
    { id: '1', nome: 'Apple Inc.', simbolo: 'AAPL' },
    { id: '2', nome: 'Amazon.com, Inc.', simbolo: 'AMZN' },
  ]);
  const [textoPesquisa, setTextoPesquisa] = useState<string>('');
  const [modoSelecao, setModoSelecao] = useState<boolean>(false);
  const [itensSelecionados, setItensSelecionados] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const router = useRouter();

  const acoesFiltradas = acoesFavoritas.filter((acao) =>
    acao.nome.toLowerCase().includes(textoPesquisa.toLowerCase())
  );

  const handleDesfavoritar = (id: string) => {
    setAcoesFavoritas((prevAcoes) => prevAcoes.filter((acao) => acao.id !== id));
  };

  const handleSelecionarItem = (id: string) => {
    setItensSelecionados((prevSelecionados) => {
      if (prevSelecionados.includes(id)) {
        return prevSelecionados.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelecionados, id];
      }
    });
  };

  const handleSelecionarTodos = () => {
    if (itensSelecionados.length === acoesFiltradas.length) {
      setItensSelecionados([]);
    } else {
      setItensSelecionados(acoesFiltradas.map((item) => item.id));
    }
  };

  const handleExcluirSelecionados = () => {
    if (itensSelecionados.length === 0) {
      // Se nenhum item estiver selecionado, não fazemos nada
      return;
    }
    setModalVisible(true);
  };

  const confirmarExclusao = () => {
    setAcoesFavoritas((prevAcoes) =>
      prevAcoes.filter((acao) => !itensSelecionados.includes(acao.id))
    );
    setItensSelecionados([]);
    setModoSelecao(false);
    setModalVisible(false);
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
      style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc', flexDirection: 'row', alignItems: 'center' }}
    >
      {modoSelecao && (
        <Icon
          name={itensSelecionados.includes(item.id) ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color="#e57748"
        />
      )}
      <View style={{ flex: 1, marginLeft: modoSelecao ? 10 : 0 }}>
        <Text style={{ fontSize: 18, color: '#1b38a9', fontWeight: 'bold' }}>{item.nome}</Text>
        <Text style={{ color: '#555' }}>{item.simbolo}</Text>
      </View>
      {!modoSelecao && (
        <TouchableOpacity onPress={() => handleDesfavoritar(item.id)}>
          <Icon name="close" size={24} color="red" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Barra de Pesquisa */}
      <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
        <TextInput
          placeholder="Pesquisar nos favoritos"
          value={textoPesquisa}
          onChangeText={setTextoPesquisa}
          style={{
            borderWidth: 1,
            borderColor: '#e57748',
            borderRadius: 8,
            padding: 12,
            fontSize: 16,
            color: '#333',
          }}
        />
      </View>
      {/* Botão de Selecionar */}
      <View style={{ padding: 16 }}>
        <TouchableOpacity onPress={() => setModoSelecao(!modoSelecao)} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="select-all" size={24} color="#e57748" />
          <Text style={{ color: '#e57748', marginLeft: 8, fontSize: 16 }}>
            {modoSelecao ? 'Cancelar' : 'Selecionar'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Botões de Selecionar Todos e Excluir */}
      {modoSelecao && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
          <TouchableOpacity onPress={handleSelecionarTodos} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon
              name={itensSelecionados.length === acoesFiltradas.length ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color="#e57748"
            />
            <Text style={{ color: '#e57748', marginLeft: 8, fontSize: 16 }}>
              {itensSelecionados.length === acoesFiltradas.length ? 'Desmarcar Todos' : 'Selecionar Todos'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleExcluirSelecionados}>
            <Text style={{ color: 'red', fontSize: 16 }}>Excluir Selecionados</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Lista de Ações Favoritas */}
      <FlatList
        data={acoesFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        extraData={itensSelecionados}
      />
      {/* Modal de Confirmação */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: '80%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 20 }}>
              Essa ação irá excluir os itens selecionados da lista de favoritos. Quer continuar?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginRight: 20 }}>
                <Text style={{ color: '#e57748', fontSize: 16 }}>NÃO</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmarExclusao}>
                <Text style={{ color: 'red', fontSize: 16 }}>SIM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TelaFavoritos;