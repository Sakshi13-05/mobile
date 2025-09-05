// File: mobile/app/(tabs)/history.jsx

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { getItemAsync } from 'expo-storage';

const PRIMARY_COLOR = '#D90429';


const API_URL = 'http://192.168.1.3:3000';

// This is a small component to render each item in the list
const BookingItem = ({ item }) => (
  <TouchableOpacity style={styles.itemContainer}>
    <View style={styles.itemHeader}>
      <MaterialCommunityIcons name="ambulance" size={24} color={PRIMARY_COLOR} />
      {/* Format the date string from the database to be more readable */}
      <Text style={styles.itemDate}>{new Date(item.date).toLocaleString()}</Text>
    </View>
    <View style={styles.itemRow}>
      <FontAwesome5 name="map-marker-alt" size={16} color="green" style={styles.itemIcon} />
      <Text style={styles.itemText} numberOfLines={1}>{item.pickup}</Text>
    </View>
    <View style={styles.itemRow}>
      <FontAwesome5 name="flag-checkered" size={16} color={PRIMARY_COLOR} style={styles.itemIcon} />
      <Text style={styles.itemText} numberOfLines={1}>{item.dropoff}</Text>
    </View>
    <View style={styles.itemFooter}>
        <Text style={[styles.status, item.status === 'Cancelled' && styles.statusCancelled]}>{item.status}</Text>
        <Text style={styles.priceText}>${item.price}</Text>
    </View>
  </TouchableOpacity>
);

export default function HistoryScreen() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This function fetches the data from the backend
  const fetchHistory = async () => {
    setIsLoading(true);
    const token = await getItemAsync('userToken');
    if (!token) {
        Alert.alert("Authentication Error", "Please log in again.");
        setIsLoading(false);
        return;
    }

    try {
        const response = await fetch(`${API_URL}/booking-history`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Could not fetch data.");
        }
        setBookings(data.history);
    } catch (err) {
        Alert.alert("Error", "Could not fetch booking history. " + err.message);
    } finally {
        setIsLoading(false);
    }
  };

  // useFocusEffect is a hook that runs when the screen comes into focus.
  // This ensures the history is always up-to-date.
  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  // Show a loading spinner while fetching
  if (isLoading) {
      return (
          <SafeAreaView style={styles.centeredContainer}>
              <ActivityIndicator size="large" color={PRIMARY_COLOR} />
          </SafeAreaView>
      );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Booking History</Text>
      <FlatList
        data={bookings}
        renderItem={({ item }) => <BookingItem item={item} />}
        keyExtractor={item => item._id} // Use the unique _id from MongoDB
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No booking history found.</Text>
                <Text style={styles.emptySubtitle}>Create a booking on the home screen to see it here.</Text>
            </View>
        )}
        onRefresh={fetchHistory} // This enables pull-to-refresh
        refreshing={isLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8f8f8',
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#1c1c1e',
    padding: 20,
    paddingBottom: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
  },
  itemDate: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#333',
    fontSize: 14,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemIcon: {
    width: 20,
    textAlign: 'center',
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    color: '#555',
    fontSize: 15,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c1e',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'green',
    textTransform: 'uppercase',
  },
  statusCancelled: {
    color: PRIMARY_COLOR,
  },
  emptyContainer: {
    flex: 1,
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'gray',
  },
  emptySubtitle: {
    fontSize: 14,
    color: 'gray',
    marginTop: 10,
    textAlign: 'center',
  }
});