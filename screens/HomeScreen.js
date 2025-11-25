import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';

export default function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [searchType, setSearchType] = useState('movie'); // 'movie' or 'user'
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchText.trim() === '') {
      setReviews([]);
      return;
    }

    setLoading(true);

    if (searchType === 'user') {
      // Search for user profile
      try {
        const response = await fetch(`http://localhost:3000/profile/${searchText}`);
        if (response.status === 404) {
          Alert.alert('Usuário não encontrado');
          setLoading(false);
          return;
        }
        if (!response.ok) {
          Alert.alert('Erro ao buscar usuário');
          setLoading(false);
          return;
        }
        const userData = await response.json();
        setLoading(false);
        // Navigate to Profile screen with username param
        navigation.navigate('Profile', { username: userData.username });
      } catch (error) {
        Alert.alert('Erro na conexão');
        setLoading(false);
      }
    } else {
      // Search for movie reviews
      try {
        const response = await fetch(`http://localhost:3000/reviews?name=${encodeURIComponent(searchText)}`);
        if (!response.ok) {
          Alert.alert('Erro ao buscar filmes');
          setLoading(false);
          return;
        }
        const data = await response.json();
        setLoading(false);
        if (data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        } else {
          setReviews([]);
        }
      } catch (error) {
        Alert.alert('Erro na conexão');
        setLoading(false);
      }
    }
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
      <Text style={styles.reviewUser}>por @{item.username}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        <Text>Buscar Filme</Text>
        <Switch
          value={searchType === 'user'}
          onValueChange={() => {
            setSearchType(searchType === 'user' ? 'movie' : 'user');
            setReviews([]);
            setSearchText('');
          }}
        />
        <Text>Buscar Usuário</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder={
          searchType === 'user'
            ? 'Digite o nome de usuário'
            : 'Digite o nome do filme'
        }
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        editable={!loading}
      />

      {loading && <Text>Carregando...</Text>}

      {!loading && searchType === 'movie' && (
        reviews.length === 0 ? (
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
        )
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
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
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
  reviewUser: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 4,
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
