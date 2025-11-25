import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default function AddReviewScreen() {
  const [movieName, setMovieName] = useState('');
  const [rating, setRating] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [sending, setSending] = useState(false);

  const pickImage = async () => {
    // Request permission to access gallery
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão necessária',
        'Precisamos acessar a galeria para selecionar uma foto.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (movieName.trim() === '') {
      Alert.alert('Erro', 'Por favor, informe o nome do filme.');
      return;
    }
    const ratingValue = parseFloat(rating);
    if (!rating || isNaN(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      Alert.alert('Erro', 'Informe uma avaliação válida (1 a 5).');
      return;
    }
    if (reviewText.length > 250) {
      Alert.alert('Erro', 'A review deve ter no máximo 250 caracteres.');
      return;
    }
    if (!imageUri) {
      Alert.alert('Erro', 'Por favor, selecione uma foto do filme.');
      return;
    }

    try {
      setSending(true);

      // Check if the movie already exists
      const movieResponse = await fetch(`http://localhost:3000/movies?name=${encodeURIComponent(movieName)}`);
      if (!movieResponse.ok) {
        Alert.alert('Erro ao buscar filme');
        setSending(false);
        return;
      }
      const movies = await movieResponse.json();

      let movieId;
      if (movies.length > 0) {
        movieId = movies[0].id;
      } else {
        // Create a new movie with image upload
        const formData = new FormData();
        formData.append('name', movieName);

        // Determine file type from URI
        const uriParts = imageUri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('photo', {
          uri: imageUri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });

        const createMovieResponse = await fetch('http://localhost:3000/movies', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (!createMovieResponse.ok) {
          Alert.alert('Erro ao cadastrar filme');
          setSending(false);
          return;
        }
        const newMovie = await createMovieResponse.json();
        movieId = newMovie.id;
      }

      // Use a fixed userId for demo; adapt to actual user authentication
      const userId = 1;

      // Create the review
      const createReviewResponse = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          movieId,
          rating: ratingValue,
          reviewText,
        }),
      });

      if (!createReviewResponse.ok) {
        Alert.alert('Erro ao cadastrar review');
        setSending(false);
        return;
      }

      Alert.alert('Sucesso', 'Review cadastrada com sucesso!');
      setMovieName('');
      setRating('');
      setReviewText('');
      setImageUri(null);
      setSending(false);
    } catch (error) {
      Alert.alert('Erro na comunicação com o servidor');
      setSending(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome do Filme</Text>
      <TextInput
        style={styles.input}
        value={movieName}
        onChangeText={setMovieName}
        placeholder="Digite o nome do filme"
        editable={!sending}
      />

      <Text style={styles.label}>Avaliação (1 a 5, pode usar 1.5, 2.5 etc.)</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={setRating}
        keyboardType="decimal-pad"
        placeholder="Ex: 3.5"
        editable={!sending}
      />

      <Text style={styles.label}>Review (até 250 caracteres)</Text>
      <TextInput
        style={[styles.input, styles.reviewInput]}
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        maxLength={250}
        placeholder="Escreva sua review"
        editable={!sending}
      />

      <Text style={styles.label}>Foto do Filme</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage} disabled={sending}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imagePlaceholder}>Clique para selecionar uma imagem</Text>
        )}
      </TouchableOpacity>

      <Button title={sending ? "Enviando..." : "Cadastrar Review"} onPress={handleSubmit} disabled={sending} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 6,
  },
  reviewInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePicker: {
    marginVertical: 12,
    height: 180,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    color: '#888',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
});
