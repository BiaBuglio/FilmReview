import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';

export default function MyProfileScreen() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [biography, setBiography] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null); // Uri of profile photo

  useEffect(() => {
    // TODO: Fetch current user data from API and populate state
    // Example placeholder code:
    /*
    fetch('API_ENDPOINT_TO_GET_CURRENT_USER')
      .then(response => response.json())
      .then(data => {
        setFullName(data.fullName);
        setUsername(data.username);
        setEmail(data.email);
        setPassword(''); // Do not prefill password for security
        setBiography(data.biography);
        setPronouns(data.pronouns);
        setProfilePhoto(data.profilePhoto);
      })
      .catch(error => console.error(error));
    */
    // Temporary static data for demo:
    setFullName('John Doe');
    setUsername('john_doe');
    setEmail('john@example.com');
    setBiography('Film enthusiast and critic.');
    setPronouns('he/him');
    setProfilePhoto(null);
  }, []);

  const handleSaveProfile = () => {
    // TODO: Send updated user data to API
    // Placeholder example:
    /*
    fetch('API_ENDPOINT_TO_UPDATE_USER', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName,
        username,
        email,
        password,
        biography,
        pronouns,
        profilePhoto,
      }),
    })
      .then(response => {
        if (response.ok) {
          Alert.alert('Success', 'Profile updated successfully.');
        } else {
          Alert.alert('Error', 'Failed to update profile.');
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Failed to update profile.');
        console.error(error);
      });
    */
    Alert.alert('Profile', 'Profile saved (API call placeholder).');
  };

  const handleSelectPhoto = () => {
    // TODO: Implement photo picker here
    Alert.alert('Photo', 'Select profile photo (not implemented).');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Profile Photo</Text>
      <TouchableOpacity style={styles.photoPlaceholder} onPress={handleSelectPhoto}>
        {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} style={styles.photo} />
        ) : (
          <Text style={styles.photoText}>Tap to add photo</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
        maxLength={50}
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        maxLength={30}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={true}
        placeholder="Enter new password"
      />

      <Text style={styles.label}>Biography</Text>
      <TextInput
        value={biography}
        onChangeText={setBiography}
        style={[styles.input, styles.bioInput]}
        multiline
        maxLength={150}
      />

      <Text style={styles.label}>Pronouns</Text>
      <TextInput
        value={pronouns}
        onChangeText={setPronouns}
        style={styles.input}
        maxLength={20}
        placeholder="e.g. he/him, she/her, they/them"
      />

      <Button title="Save Profile" onPress={handleSaveProfile} />
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
});
