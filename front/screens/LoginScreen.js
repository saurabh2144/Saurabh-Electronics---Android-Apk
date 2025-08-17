import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      const response = await fetch("https://backend-8hlu.onrender.com/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const json = await response.json();

      if (!response.ok) {
        Alert.alert("Error", json.error || "Invalid credentials");
        return;
      }

      console.log("User ID after login: " + json.user.userId);
      navigation.navigate('HomePage', { userId: json.user.userId });

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not connect to the server");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Don't have an account? 
        <Text style={styles.link} onPress={() => navigation.navigate('Signup')}> Sign Up</Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#eeeeee'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    marginTop: 20,
    fontSize: 14
  },
  link: {
    color: 'blue'
  }
});
