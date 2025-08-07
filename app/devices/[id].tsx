// app/devices/[id].tsx
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DeviceCard from '../../components/ui/DeviceCard';
import { Device } from '../../types/types';

const devices: Device[] = [
  { id: '1', name: 'Main Conveyor Motor', status: 'Online', description: 'Output: 50A, 10.5 kWh', serverName: '...', virtualIp: '...', ipAddress: '...', liveData: { current: '...', voltage: '...' }, chartData: [] },
  { id: '2', name: 'Optical Sensor 34', status: 'Online', description: 'Output: 15A, 0.2 kWh', serverName: '...', virtualIp: '...', ipAddress: '...', liveData: { current: '...', voltage: '...' }, chartData: [] },
  { id: '3', name: 'Sorting Arm Actuator', status: 'Offline', description: 'Output: 22A, 5.8 kWh', serverName: '...', virtualIp: '...', ipAddress: '...', liveData: { current: '...', voltage: '...' }, chartData: [] },
  { id: '4', name: 'QC Camera Feed 1', status: 'Offline', description: 'Output: Ready, 75%', serverName: '...', virtualIp: '...', ipAddress: '...', liveData: { current: '...', voltage: '...' }, chartData: [] },
];

export default function DeviceListScreen() {
  const { id } = useLocalSearchParams();
  const categoryName = `Category ${id}`; // 
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-4">{categoryName}</Text>
      <ScrollView>
        {devices.map((device) => (
          <DeviceCard key={device.id} device={device} categoryId={id as string} />
        ))}
      </ScrollView>
    </View>
  );
}