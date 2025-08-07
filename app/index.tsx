// app/index.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import CategoryCard from '../components/ui/Category';
import { Category } from '../types/types';

const categories: Category[] = [
  { id: '1', name: 'Assembly Line 1', deviceCount: 8, icon: '...' },
  { id: '2', name: 'Assembly Line 2', deviceCount: 6, icon: '...' },
  { id: '3', name: 'Power Distribution', deviceCount: 12, icon: '...' },
  { id: '4', name: 'Workshop Lighting', deviceCount: 4, icon: '...' },
];

export default function DevicesScreen() {
  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-3xl font-bold">Devices</Text>
        <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-lg">
          <Text className="text-white font-bold">+ Add Device</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView>
        <View>
          <Text className="text-xl font-semibold mb-2">Categories</Text>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </View>

        <View className="mt-8">
          <Text className="text-xl font-semibold mb-2">Unlinked Devices</Text>
          <View className="bg-white p-4 rounded-lg shadow-sm flex-row items-center justify-center">
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-blue-600 font-bold">View Unlinked Devices</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}