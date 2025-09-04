// File: app/(tabs)/_layout.tsx

import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// The primary red color for active elements
const PRIMARY_COLOR = '#D90429';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // We will create a custom header in each screen
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 90, // A bit taller for a modern look
          paddingBottom: 30,
        },
      }}
    >
      <Tabs.Screen
        name="index" // This links to app/(tabs)/index.jsx
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history" // You will need to create app/(tabs)/history.jsx
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="history" size={size} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="profile" // You will need to create app/(tabs)/profile.jsx
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}