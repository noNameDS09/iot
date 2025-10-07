// app/devices/[id].tsx
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import DeviceCard from '@/components/Devices/DeviceCard';
import { Device } from '@/types/types';
import { Colors } from '@/constants/Colors';

const devices: Device[] = [
  {
    id: '1',
    name: 'Main Conveyor Motor',
    status: 'Online',
    description: 'Output: 50A, 10.5 kWh',
    serverName: '...',
    virtualIp: '...',
    ipAddress: '...',
    liveData: { current: '...', voltage: '...' },
    chartData: [],
  },
  {
    id: '2',
    name: 'Optical Sensor 34',
    status: 'Online',
    description: 'Output: 15A, 0.2 kWh',
    serverName: '...',
    virtualIp: '...',
    ipAddress: '...',
    liveData: { current: '...', voltage: '...' },
    chartData: [],
  },
  {
    id: '3',
    name: 'Sorting Arm Actuator',
    status: 'Offline',
    description: 'Output: 22A, 5.8 kWh',
    serverName: '...',
    virtualIp: '...',
    ipAddress: '...',
    liveData: { current: '...', voltage: '...' },
    chartData: [],
  },
  {
    id: '4',
    name: 'QC Camera Feed 1',
    status: 'Offline',
    description: 'Output: Ready, 75%',
    serverName: '...',
    virtualIp: '...',
    ipAddress: '...',
    liveData: { current: '...', voltage: '...' },
    chartData: [],
  },
];

export default function DeviceListScreen() {
  const { id, categoryName } = useLocalSearchParams<{ id: string; categoryName?: string }>();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: categoryName || `Category ${id}`,
        }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} categoryId={id} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: 10
  },
  scrollContent: {
    paddingHorizontal: 4, // equivalent to px-4
    paddingVertical: 8, // equivalent to py-2
  },
});
