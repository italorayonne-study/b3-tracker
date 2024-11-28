import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca para ícones

const { width: screenWidth } = Dimensions.get('window');

const initialStockData = [
  { name: 'AAPL', value: '$150.25' },
  { name: 'TSLA', value: '$220.10' },
  { name: 'AMZN', value: '$135.55' },
  { name: 'GOOG', value: '$2800.45' },
  { name: 'MSFT', value: '$320.75' },
];


export default function HomeScreen() {
  const [stockData, setStockData] = useState(initialStockData);
  const [selectedIcon, setSelectedIcon] = useState<null | 'favorites' | 'search'>(null);

  // Função para simular a atualização dos dados
  const handleUpdate = () => {
    const updatedData = stockData.map((stock) => ({
      ...stock,
      value: `$${(Math.random() * 3000 + 100).toFixed(2)}`, // Atualiza valores aleatoriamente
    }));
    setStockData(updatedData);
  };

  // Obtém a ação com maior valor
  const highestStock = stockData.reduce((prev, current) =>
    parseFloat(current.value.slice(1)) > parseFloat(prev.value.slice(1)) ? current : prev
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <Text style={styles.header}>B3 Tracker</Text>

      {/* Resumo de Destaque */}
      <View style={styles.highlightCard}>
        <Text style={styles.highlightText}>
          Destaque: {highestStock.name} - {highestStock.value}
        </Text>
      </View>

      {/* Carrossel */}
      <Carousel
        loop
        autoPlay
        autoPlayInterval={2000}
        width={screenWidth * 0.6}
        height={80}
        data={stockData}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.stockName}>{item.name}</Text>
            <Text style={styles.stockValue}>{item.value}</Text>
          </View>
        )}
      />

      {/* Ícones de Navegação */}
      <View style={styles.iconContainer}>
        {/* Ícone de Favoritos */}
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedIcon === 'favorites' && styles.iconSelected, // Estilo ao ser selecionado
          ]}
          onPress={() => setSelectedIcon('favorites')}
        >
          <View style={styles.iconBox}>
            <Ionicons name="star" size={100} color="#0056b3" />
            <Text style={styles.iconText}>Favoritos</Text>
          </View>
        </TouchableOpacity>

        {/* Ícone de Pesquisa */}
        <TouchableOpacity
          style={[
            styles.iconWrapper,
            selectedIcon === 'search' && styles.iconSelected, // Estilo ao ser selecionado
          ]}
          onPress={() => setSelectedIcon('search')}
        >
          <View style={styles.iconBox}>
            <Ionicons name="search" size={100} color="#0056b3" />
            <Text style={styles.iconText}>Procurar</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Botão de Atualizar Dados */}
      <View style={styles.buttonContainer}>
        <Button title="Atualizar Dados" onPress={handleUpdate} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  highlightCard: {
    backgroundColor: '#d1e7ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    width: screenWidth * 0.8,
  },
  highlightText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  stockName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  stockValue: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  iconContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  iconBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: 200,
    height: 200,
  },
  iconText: {
    fontSize: 16,
    color: '#0056b3',
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconSelected: {
    backgroundColor: '#d1e7ff',
    borderRadius: 15,
  },
  buttonContainer: {
    marginTop: 80,
    width: screenWidth * 1,
  },
});