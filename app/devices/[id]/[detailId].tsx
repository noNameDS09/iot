// app/devices/[id]/[detailId].tsx
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Device } from '../../../types/types';
import { Svg } from 'react-native-svg';

const devices: Device[] = [
  { id: '1', name: 'Main Conveyor Motor', status: 'Online', description: '...', serverName: 'SERVER-A1', virtualIp: '201.174.12', ipAddress: '192.168.1.101', liveData: { current: '5.2 A', voltage: '221.5 V' }, chartData: [/* ... */] },
];

export default function DeviceDetailScreen() {
  const { detailId } = useLocalSearchParams();
  const device = devices.find((d) => d.id === detailId);

  if (!device) {
    return <Text>Device not found!</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">{device.name}</Text>
        <TouchableOpacity className="px-4 py-2 rounded-full bg-red-500">
          <Text className="text-white font-bold">Shutdown</Text>
        </TouchableOpacity>
      </View>
      
      <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <Text className="text-xl font-semibold mb-2">Voltage (Last 30 mins)</Text>
        <Svg height="150" width="100%" viewBox="0 0 300 120">
        </Svg>
      </View>

      <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <Text className="text-xl font-semibold mb-2">Details</Text>
        <View className="flex-row justify-between py-1">
          <Text className="text-gray-600">Device ID:</Text>
          <Text className="font-bold">{device.id}</Text>
        </View>
        <View className="flex-row justify-between py-1">
          <Text className="text-gray-600">Server Name:</Text>
          <Text className="font-bold">{device.serverName}</Text>
        </View>
      </View>
      
      <View className="bg-white p-4 rounded-lg shadow-sm">
        <Text className="text-xl font-semibold mb-2">Live Data</Text>
        <View className="flex-row justify-between py-1">
          <Text className="text-gray-600">Current:</Text>
          <Text className="font-bold">{device.liveData.current}</Text>
        </View>
        <View className="flex-row justify-between py-1">
          <Text className="text-gray-600">Voltage:</Text>
          <Text className="font-bold">{device.liveData.voltage}</Text>
        </View>
      </View>
    </ScrollView>
  );
}