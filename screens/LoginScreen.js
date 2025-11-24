import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Placeholder para autenticação via API
    if (username.trim() === '' || password.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha usuário e senha.');
      return;
    }

    // Aqui faria o fetch para API de login com JWT, por enquanto simula sucesso
    // Após autenticação, navega para Home
    navigation.replace('Home');
  };

  const handleRegisterRedirect = () => {
    // Caso queira implementar tela de cadastro, poderia navegar para ela
    Alert.alert('Cadastro', 'Funcionalidade de cadastro ainda não implementada.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleLogin} />

      <TouchableOpacity onPress={handleRegisterRedirect} style={styles.registerLink}>
        <Text style={styles.registerText}>Não possui cadastro? Clique aqui</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16
  },
  registerLink: {
    marginTop: 16,
    alignItems: 'center'
  },
  registerText: {
    color: '#2980b9'
  }
});
