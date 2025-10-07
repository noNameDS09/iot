// app/devices/index.tsx
import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import CategoryCard from "@/components/Devices/Category";
import { Category } from "@/types/types";
import { SafeAreaView } from "react-native-safe-area-context";

const categories: Category[] = [
  { id: "1", name: "Conveyors", icon: "🚀", deviceCount: 5 },
  { id: "2", name: "Sensors", icon: "📡", deviceCount: 8 },
  { id: "3", name: "Actuators", icon: "⚙️", deviceCount: 3 },
  { id: "4", name: "Cameras", icon: "📷", deviceCount: 2 },
];

export default function DevicesScreen() {
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={[styles.container, { backgroundColor: Colors.light.background, paddingTop: 10 }]}
      >
        <View
          style={[
            styles.headerContainer,
            { backgroundColor: Colors.light.background },
          ]}
        >
          <Text style={[styles.headerTitle, { color: Colors.light.text }]}>
            Devices
          </Text>
          <Text style={[styles.headerSubtitle, { color: Colors.light.icon }]}>
            Manage your IoT devices
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    // In a real app, you might want a different background for the header
    // For now, it inherits from the container
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  main: {
    flex: 1,
  },
});
