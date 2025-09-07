// File: app/index.js (This is your Opening Splash Screen)

import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIMARY_COLOR = '#D90429';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    
    const timer = setTimeout(() => {
      
      router.replace('/onboarding');
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.logoContainer}>
        <Text style={styles.logoRed}>AmTracker</Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
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
});