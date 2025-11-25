import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

export default function ProfileScreen({ route }) {
  const { username } = route.params; // username of the profile to display

  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/profile/${username}`);
        if (!response.ok) {
          Alert.alert('Erro ao carregar perfil');
          setLoading(false);
          return;
        }
        const data = await response.json();
        setFullName(data.fullName);
        setBio(data.bio);
        setPronouns(data.pronouns);
        setProfilePhoto(data.photo);
        setReviews(data.reviews || []);
        setLoading(false);
      } catch (error) {
        Alert.alert('Erro na conexão');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#333" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={
          profilePhoto
            ? { uri: profilePhoto }
            : require('../assets/icon.png') // default profile picture
        }
        style={styles.photo}
      />

      <Text style={styles.fullName}>{fullName}</Text>
      <Text style={styles.username}>@{username}</Text>

      <Text style={styles.label}>Biography</Text>
      <Text style={styles.text}>{biography || 'No biography provided.'}</Text>

      <Text style={styles.label}>Pronouns</Text>
      <Text style={styles.text}>{pronouns || 'Not specified'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  photo: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    marginBottom: 12,
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  text: {
    fontSize: 14,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
