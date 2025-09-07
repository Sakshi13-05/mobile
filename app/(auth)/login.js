// File: mobile/app/(auth)/login.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIMARY_COLOR = '#D90429';

const API_URL = "http://192:168.1.3:3000";

export default function LoginScreen() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }


      await AsyncStorage.setItem('userToken', data.token);
      await AsyncStorage.setItem('userData', JSON.stringify(data.user));

     
      router.replace('/(tabs)');

    } catch (err) {
      setError(err.message);
      console.error('Login failed:', err);
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
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Welcome back! Please login to continue.</Text>

        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <View style={styles.passwordContainer}>
          <TextInput style={styles.passwordInput} placeholder="Password" secureTextEntry={!isPasswordVisible} value={password} onChangeText={setPassword} />
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>
        
        <Text style={styles.signupText}>
          Dont have an account?{' '}
          <Text style={styles.signupLink} onPress={() => router.push('/signup')}>
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    content: { flexGrow: 1, padding: 25, paddingTop: 60, justifyContent: 'center' },
    backButton: { position: 'absolute', top: 55, left: 20, zIndex: 1 },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 16, color: 'gray', marginBottom: 40, textAlign: 'center' },
    input: { backgroundColor: '#F6F7FB', height: 58, marginBottom: 15, fontSize: 16, borderRadius: 10, padding: 20 },
    passwordContainer: { backgroundColor: '#F6F7FB', height: 58, marginBottom: 20, borderRadius: 10, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    passwordInput: { flex: 1, fontSize: 16 },
    loginButton: { backgroundColor: PRIMARY_COLOR, height: 58, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
    buttonText: { fontSize: 18, fontWeight: 'bold', color: 'white' },
    errorText: { color: 'red', textAlign: 'center', marginTop: 10, marginBottom: 10 },
    signupText: { marginTop: 40, textAlign: 'center', color: 'gray' },
    signupLink: { color: PRIMARY_COLOR, fontWeight: 'bold' },
});