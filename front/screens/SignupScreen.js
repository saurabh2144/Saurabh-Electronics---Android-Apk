import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !age || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    try {
      const res = await fetch("https://backend-8hlu.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, password, age: Number(age), email })
      });
      const data = await res.json();
      if (!res.ok) {
        Alert.alert("Error", data.error || "Something went wrong");
        return;
      }
      Alert.alert("Success", data.message);
      navigation.navigate("Login");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not connect to server");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text style={styles.signupText} onPress={() => navigation.navigate('Login')}>
          Login
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#f2f2f2'
  },
  title: { 
    fontSize: 28,
     fontWeight: 'bold',
      marginBottom: 40
     },
  input: { 
    width: '100%', 
    backgroundColor: '#fff',
     padding: 15, 
     borderRadius: 10, 
     marginBottom: 20
     },
  button: { 
    width: '100%',
     backgroundColor: '#4f46e5',
      padding: 15, 
      borderRadius: 10,
      
      alignItems: 'center',
       marginTop: 10 
      },
  buttonText: 
  { color: '#fff',
     fontWeight: 'bold',
      fontSize: 18 
    },
  footerText: { 
    marginTop: 20,
     color: '#555', 
     fontSize: 14 },
  signupText: {
    
    color: '#4f46e5',
     fontWeight: 'bold' },
});
