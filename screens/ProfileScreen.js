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
  const { userId } = route.params; // User ID of the profile to display

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [biography, setBiography] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null); // Uri of profile photo
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch the public user profile data from API using userId
    // Example placeholder:
    /*
    fetch(`API_ENDPOINT_TO_GET_PUBLIC_PROFILE/${userId}`)
      .then(response => response.json())
      .then(data => {
        setFullName(data.fullName);
        setUsername(data.username);
        setBiography(data.biography);
        setPronouns(data.pronouns);
        setProfilePhoto(data.profilePhoto);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
    */
    // Temporary static demo data:
    setFullName('Jane Smith');
    setUsername('jane_smith');
    setBiography('Movie buff and blogger.');
    setPronouns('she/her');
    setProfilePhoto(null);
    setLoading(false);
  }, [userId]);

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
