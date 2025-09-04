// File: app/(tabs)/index.jsx

import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PRIMARY_COLOR = '#D90429';

export default function HomeScreen() {
  const router = useRouter();
  
  // Dummy user name for display
  const userName = "Emma";

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingText}>Good Morning, {userName}</Text>
          <Text style={styles.headerSubText}>How can we help you?</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={28} color="#1c1c1e" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }} // Placeholder user image
              style={styles.profileImage} 
            />
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
});