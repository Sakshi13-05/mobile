// File: mobile/app/(tabs)/profile.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#D90429';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Load the user's data from storage when the screen opens
  useEffect(() => {
    const loadUserData = async () => {
      const userDataString = await SecureStore.getItemAsync('userData');
      if (userDataString) {
        setUser(JSON.parse(userDataString));
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    // For JWT, logging out means deleting the token and user data from storage
    await SecureStore.deleteItemAsync('userToken');
    await SecureStore.deleteItemAsync('userData');
    
    // Navigate back to the auth flow and prevent going back
    router.replace('/(auth)'); 
  };
  
  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: handleLogout },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
            <Ionicons name="person-circle-outline" size={120} color={PRIMARY_COLOR} />
        </View>
        <Text style={styles.name}>{user?.name || 'Loading...'}</Text>
        <Text style={styles.email}>{user?.email || '...'}</Text>
      </View>
      
      <View style={styles.menuSection}>
          {/* You can add more menu items here in the future */}
          <TouchableOpacity style={styles.logoutButton} onPress={confirmLogout}>
            <Ionicons name="log-out-outline" size={24} color="white" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f8f8',
    justifyContent: 'space-between',
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: 40,
  },
  avatar: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1c1c1e',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  menuSection: {
    padding: 20,
  },
  logoutButton: {
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 15,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  }
});