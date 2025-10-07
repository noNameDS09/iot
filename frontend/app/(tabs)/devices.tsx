import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from '../../components/Devices/Category';
import { Category } from '../../types/types';
import { Colors } from '@/constants/Colors';

// Mock data for categories. In a real app, you'd fetch this from an API.
const categories: Category[] = [
  { id: '1', name: 'Conveyor Systems', deviceCount: 12, icon: 'C' },
  { id: '2', name: 'Packaging Area', deviceCount: 8, icon: 'P' },
  { id: '3', name: 'Quality Control', deviceCount: 5, icon: 'Q' },
];

export default function DevicesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Device Categories</Text>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background, // Equivalent to bg-gray-100
  },
  scrollContent: {
    padding: 16, // Equivalent to p-4
  },
  title: {
    fontSize: 30, // Equivalent to text-3xl
    fontWeight: 'bold',
    marginBottom: 16, // Equivalent to mb-4
    color: '#1f2937', // Equivalent to text-gray-800
  },
});
