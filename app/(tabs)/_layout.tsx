// File: mobile/app/(tabs)/_layout.tsx

import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

const PRIMARY_COLOR = '#D90429';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { height: 80, paddingBottom: 25 },
        tabBarLabelStyle: { fontSize: 12 }
      }}
    >
      <Tabs.Screen
        name="index" // Home Screen
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (<Ionicons name="home" size={size} color={color} />),
        }}
      />
      <Tabs.Screen
        name="history" // History Screen
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (<FontAwesome5 name="history" size={size-2} color={color} />),
        }}
      />
       <Tabs.Screen
        name="profile" // Profile Screen
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (<Ionicons name="person-circle" size={size+2} color={color} />),
        }}
      />
    </Tabs>
  );
}