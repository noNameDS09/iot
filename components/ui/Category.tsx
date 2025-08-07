// components/ui/CategoryCard.tsx
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Category } from '../../types/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-white p-4 m-2 rounded-lg shadow-sm flex-row items-center"
      onPress={() => router.push(`/devices/${category.id}`)}
    >
      {/* Assuming a simple icon implementation */}
      <View className="w-10 h-10 bg-gray-200 rounded-full mr-4"></View>
      <View>
        <Text className="text-lg font-bold">{category.name}</Text>
        <Text className="text-gray-500">{category.deviceCount} of {category.deviceCount} online</Text>
      </View>
    </TouchableOpacity>
  );
}