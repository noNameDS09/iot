import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';  // Importing from expo-vector-icons

export default function TabLayout() {
  const colorScheme = 'light';  // You can replace this with dynamic colorScheme logic if needed
  // const isIOS = Platform.OS === 'ios';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,  // Set active tab color
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={24} />  // Replaced with Ionicons from expo-icons
          ),
        }}
      />
      <Tabs.Screen
        name="devices"
        options={{
          title: 'Devices',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="devices" color={color} size={24} />  // Replaced with MaterialCommunityIcons from expo-icons
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="schedule" color={color} size={24} />  // Replaced with MaterialIcons from expo-icons
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard-outline" color={color} size={24} />  // Replaced with MaterialCommunityIcons from expo-icons
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" color={color} size={24} />  // Replaced with Ionicons from expo-icons
          ),
        }}
      />
    </Tabs>
  );
}
