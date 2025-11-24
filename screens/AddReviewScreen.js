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

  const pickImage = async () => {
    // Solicitar permissão para acessar a galeria
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

  const handleSubmit = () => {
    // Validação dos campos
    if (movieName.trim() === '') {
      Alert.alert('Erro', 'Por favor, informe o nome do filme.');
      return;
    }
    if (!rating || isNaN(rating) || rating < 1 || rating > 5) {
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

    // Aqui você faria a chamada para a API para enviar a review

    Alert.alert('Sucesso', 'Review cadastrada com sucesso!');
    // Resetar formulário
    setMovieName('');
    setRating('');
    setReviewText('');
    setImageUri(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome do Filme</Text>
      <TextInput
        style={styles.input}
        value={movieName}
        onChangeText={setMovieName}
        placeholder="Digite o nome do filme"
      />

      <Text style={styles.label}>Avaliação (1 a 5, pode usar 1.5, 2.5 etc.)</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={setRating}
        keyboardType="decimal-pad"
        placeholder="Ex: 3.5"
      />

      <Text style={styles.label}>Review (até 250 caracteres)</Text>
      <TextInput
        style={[styles.input, styles.reviewInput]}
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        maxLength={250}
        placeholder="Escreva sua review"
      />

      <Text style={styles.label}>Foto do Filme</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imagePlaceholder}>Clique para selecionar uma imagem</Text>
        )}
      </TouchableOpacity>

      <Button title="Cadastrar Review" onPress={handleSubmit} />
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
