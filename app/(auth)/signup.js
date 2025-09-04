// File: mobile/app/(auth)/signup.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PRIMARY_COLOR = '#D90429';

const API_URL= "http://192.168.1.3:3000";


export default function SignUpScreen() {
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    router.push({
      pathname: '/verify',
      params: { 
        email: email, 
        name: name 
      }
    });

    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // If signup is successful, navigate to the verify screen
      router.push({
        pathname: '/verify',
        params: { email: email }
      });

    } catch (err) {
      setError(err.message);
      console.error('Signup failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
           <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Create Account</Text>

        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <View style={styles.passwordContainer}>
          <TextInput style={styles.passwordInput} placeholder="Password" secureTextEntry={!isPasswordVisible} value={password} onChangeText={setPassword} />
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.signupButtonText}>Sign Up</Text>}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    content: { flexGrow: 1, padding: 25, paddingTop: 60, justifyContent: 'center' },
    backButton: { position: 'absolute', top: 55, left: 20, zIndex: 1 },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
    input: { backgroundColor: '#F6F7FB', height: 58, marginBottom: 15, fontSize: 16, borderRadius: 10, padding: 20 },
    passwordContainer: { backgroundColor: '#F6F7FB', height: 58, marginBottom: 20, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    passwordInput: { flex: 1, fontSize: 16 },
    signupButton: { backgroundColor: PRIMARY_COLOR, height: 58, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
    signupButtonText: { fontSize: 18, fontWeight: 'bold', color: 'white' },
    errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
});


