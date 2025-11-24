import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleSearch = () => {
    // Aqui você faria a chamada API para buscar os reviews do filme
    // Por enquanto, vamos limpar a lista se nada buscado
    if (searchText.trim() === '') {
      setReviews([]);
      return;
    }

    // Simulação de resultado vazio para filmes não encontrados
    // Aqui você faria a requisição para o backend e atualizaria o estado `reviews`
    setReviews([]);
  };

  const renderReview = ({ item }) => (
    <TouchableOpacity
      style={styles.reviewItem}
      onPress={() => {
        // Possibilidade de navegar para detalhes do review ou perfil do usuário
        // navigation.navigate('MovieReviews', { movieId: item.movieId });
      }}
    >
      <Text style={styles.reviewTitle}>{item.movieName}</Text>
      <Text style={styles.reviewText}>{item.reviewText}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Buscar filme:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do filme"
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      {reviews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Seu gosto é peculiar, seja o primeiro a avaliar esse filme!
          </Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderReview}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddReview')}
      >
        <Text style={styles.addButtonText}>+ Adicionar Review</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.profileButtonText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    fontStyle: 'italic',
  },
  listContainer: {
    paddingBottom: 80,
  },
  reviewItem: {
    backgroundColor: '#f4f4f4',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
  },
  addButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#2980b9',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  profileButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#27ae60',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
