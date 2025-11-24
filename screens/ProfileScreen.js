import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from 'react-native';

export default function ProfileScreen() {
  const [username, setUsername] = useState('Usuário');
  const [biography, setBiography] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null); // Uri da foto de perfil
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    // Aqui faria a chamada para carregar dados do usuário e seus reviews via API
    // Por enquanto, dados simulados
    setUsername('FilmLover123');
    setBiography('Apaixonado por cinema e críticas de filmes.');
    setUserReviews([
      {
        id: 1,
        movieName: 'Matrix',
        reviewText: 'Filme revolucionário e muito envolvente.',
      },
      {
        id: 2,
        movieName: 'Inception',
        reviewText: 'Intrigante e cheio de camadas.',
      },
    ]);
  }, []);

  const handleSaveProfile = () => {
    // Aqui enviaria os dados atualizados para backend via API
    Alert.alert('Perfil', 'Perfil atualizado com sucesso!');
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewItem}>
      <Text style={styles.movieName}>{item.movieName}</Text>
      <Text style={styles.reviewText}>{item.reviewText}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Foto de perfil</Text>

      <TouchableOpacity
        style={styles.photoPlaceholder}
        onPress={() => {
          // Aqui poderia abrir a galeria para escolher foto
          Alert.alert('Foto', 'Selecione uma foto de perfil (não implementado)');
        }}
      >
        {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} style={styles.photo} />
        ) : (
          <Text style={styles.photoText}>Clique para adicionar foto</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Nome de usuário</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        maxLength={30}
      />

      <Text style={styles.label}>Biografia</Text>
      <TextInput
        value={biography}
        onChangeText={setBiography}
        style={[styles.input, styles.bioInput]}
        multiline
        maxLength={150}
      />

      <Button title="Salvar perfil" onPress={handleSaveProfile} />

      <Text style={[styles.label, { marginTop: 24 }]}>Minhas Reviews</Text>
      <FlatList
        data={userReviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderReview}
        contentContainerStyle={styles.reviewsList}
        ListEmptyComponent={<Text>Você ainda não postou reviews.</Text>}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 8,
  },
  photoPlaceholder: {
    height: 120,
    width: 120,
    backgroundColor: '#ddd',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  photoText: {
    color: '#666',
  },
  photo: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  reviewsList: {
    paddingBottom: 50,
  },
  reviewItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  movieName: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  reviewText: {
    fontSize: 14,
  },
});
