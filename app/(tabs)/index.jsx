// File: mobile/app/(tabs)/index.jsx

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRIMARY_COLOR = '#D90429';

const API_URL = "http://192:168.1.3:3000"; 

export default function HomeScreen() {
  const router = useRouter();
  
  const [user, setUser] = useState(null); // State to hold the user data
  const [isLoading, setIsLoading] = useState(true);

  // 2. This effect runs when the screen loads to get the user's data from storage
  useEffect(() => {
    const loadUserData = async () => {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        setUser(JSON.parse(userDataString)); // Parse the string back into an object
      }
      setIsLoading(false);
    };

    loadUserData();
  }, []);

  const handleBookNow = async () => {
    const token = await AsyncStorage.getItem('userToken'); // Get the saved JWT
    if (!token) {
        Alert.alert("Error", "You are not logged in.");
        return;
    }

    // This is sample data. In a real app, this would come from a map or form.
    const bookingDetails = {
        pickup: '123 Main St, Anytown, USA',
        dropoff: 'General Hospital, 456 Health Ave',
        price: 350,
    };

    try {
        const response = await fetch(`${API_URL}/book-ambulance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Attach the JWT!
            },
            body: JSON.stringify(bookingDetails),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error);
        }

        Alert.alert("Success", "Ambulance booked! Check your history.");
    } catch (err) {
        Alert.alert("Booking Failed", err.message);
    }
  };

  // Show a loading spinner while we wait for storage
  if (isLoading) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
      </SafeAreaView>
    );
  }



  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View>
          {/* 3. Display the user's name from our state */}
          <Text style={styles.greetingText}><Text style={{fontWeight: 'bold'}}>{user?.name || 'User'}</Text></Text>
          <Text style={styles.headerSubText}>How can we help you?</Text>
        </View>
        <View style={styles.headerIcons}>
          
          <TouchableOpacity onPress={() => router.push('/profile')}>
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <Text style={styles.bookButtonText}>Create Sample Booking</Text>
      </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Request Ambulance Button */}
        <TouchableOpacity style={styles.requestButton}>
          <View style={styles.requestButtonInner}>
            <MaterialCommunityIcons name="phone" size={40} color="white" />
          </View>
        </TouchableOpacity>
        <Text style={styles.requestButtonText}>Request Ambulance</Text>

        {/* Info Cards */}
        <TouchableOpacity style={styles.infoCard}>
          <FontAwesome5 name="route" size={24} color={PRIMARY_COLOR} />
          <View style={styles.infoCardTextContainer}>
            <Text style={styles.infoCardTitle}>Ambulance Tracking</Text>
            <Text style={styles.infoCardSubtitle}>Ongoing</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.infoCard}>
          <FontAwesome5 name="first-aid" size={24} color={PRIMARY_COLOR} />
          <View style={styles.infoCardTextContainer}>
            <Text style={styles.infoCardTitle}>First Aid & Medical Assistance</Text>
            <Text style={styles.infoCardSubtitle}>Find your location</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // A very light gray background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubText: {
    fontSize: 16,
    color: 'gray',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 15,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
  },
  requestButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(217, 4, 41, 0.1)', // Light red for the outer circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestButtonInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  requestButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 40,
  },
  infoCard: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoCardTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoCardSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },

  bookButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        margin: 20,
    },
    bookButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    }
});