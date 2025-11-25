import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando as telas
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import AddReviewScreen from './screens/AddReviewScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Tela inicial de boas-vindas */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        {/* Tela de login */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />

        {/* Tela principal com busca de filmes */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Início' }}
        />

        {/* Tela de perfil do usuário */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Perfil' }}
        />

        {/* Tela para cadastro de reviews */}
        <Stack.Screen
          name="AddReview"
          component={AddReviewScreen}
          options={{ title: 'Cadastrar Review' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
