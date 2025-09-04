// File: mobile/app/(auth)/verify.js

import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

const PRIMARY_COLOR = '#D90429';
// IMPORTANT: Replace this with your computer's local IP address
const API_URL = 'http://192.168.1.3:3000';

export default function VerifyAccountScreen() {
  const router = useRouter();
  const { email,name } = useLocalSearchParams(); 

  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join('');
    if (verificationCode.length !== 4) {
        Alert.alert("Error", "Please enter the 4-digit code.");
        return;
    }

    setIsLoading(true);
    setError('');

    try {
        const response = await fetch(`${API_URL}/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, verificationCode }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Verification failed');
        }

        Alert.alert("Success", "Your account is now verified! You can now log in.");
        // After successful verification, take them to the main app or the login screen
        router.replace('/(tabs)'); // Go to the main app

    } catch (err) {
        setError(err.message);
        console.error('Verification failed:', err);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome, {name || 'User'}!</Text>

        <Text style={styles.title}>Verify Account</Text>
        <Text style={styles.subtitle}>
          Enter the 4-digit code sent to <Text style={{fontWeight: 'bold'}}>{email}</Text>.
        </Text>

        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.codeInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleInputChange(text, index)}
              value={digit}
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify} disabled={isLoading}>
            {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.verifyButtonText}>Verify</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    backButton: { position: 'absolute', top: 55, left: 20, zIndex: 1 },
    content: { flex: 1, padding: 25, paddingTop: 100, alignItems: 'center' },
    title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
    
    welcomeText: { // <-- NEW STYLE
        fontSize: 22,
        fontWeight: '600',
        color: 'gray',
        marginBottom: 20,
    },
    subtitle: { fontSize: 16, color: 'gray', textAlign: 'center', marginBottom: 40, lineHeight: 24 },
    codeInputContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginBottom: 40 },
    codeInput: { width: 60, height: 60, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, textAlign: 'center', fontSize: 24, fontWeight: 'bold' },
    verifyButton: { backgroundColor: PRIMARY_COLOR, height: 58, borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: '100%' },
    verifyButtonText: { fontSize: 18, fontWeight: 'bold', color: 'white' },
    errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
}); 