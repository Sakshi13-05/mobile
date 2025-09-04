// File: mobile/app/(auth)/index.js

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const PRIMARY_COLOR = '#D90429';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.logoContainer}>
        <Text style={styles.logoRed}>AmTracker</Text>

      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]} 
          onPress={() => { router.push('/login') }}
        >
          <Text style={[styles.buttonText, styles.loginButtonText]}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signinButton]} // Primary button style
          onPress={() => router.push('/signup')}
        >
          <Text style={[styles.buttonText, styles.signinButtonText]}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- NEW STYLES FOR HORIZONTAL BUTTONS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoRed: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
    fontStyle: 'italic',
  },
  logoAmbulances: {
    fontSize: 18,
    color: 'white',
    letterSpacing: 4,
    marginTop: -10,
  },
  // This is the key style change
  buttonContainer: {
    flexDirection: 'row', // This makes the items (buttons) align horizontally
    justifyContent: 'space-between', // Puts space between the buttons
    paddingHorizontal: 20,
    paddingBottom: 50, // Pushes the buttons up from the very bottom
    paddingTop: 20,
  },
  // A base style for both buttons
  button: {
    flex: 1, // This makes both buttons share the space equally
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  // Style for the secondary "Login" button (outline)
  loginButton: {
    backgroundColor: 'transparent',
    marginRight: 10, // Adds a small gap between the buttons
  },
  // Style for the primary "Signin" button (filled)
  signinButton: {
    backgroundColor: 'white',
    marginLeft: 10, // Adds a small gap between the buttons
  },
  // A base text style
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Text color for the "Login" button
  loginButtonText: {
    color: 'white',
  },
  // Text color for the "Signin" button
  signinButtonText: {
    color: PRIMARY_COLOR,
  },
});