import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import type { Category } from '../../types/types';
import { Colors } from '@/constants/Colors';

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();

  // Simulated logic
  const onlineCount = Math.floor(category.deviceCount * 0.7);
  const isAllOnline = onlineCount === category.deviceCount;
  const isNoneOnline = onlineCount === 0;

  const statusStyles = (() => {
    if (isAllOnline) {
      return {
        statusText: 'Online',
        statusColor: '#22c55e', // green-500
        dotColor: '#22c55e', // green-500
      };
    }
    if (isNoneOnline) {
      return {
        statusText: 'Offline',
        statusColor: '#a1a1aa', // gray-400
        dotColor: '#a1a1aa', // gray-400
      };
    }
    // Default: Partially Online
    return {
      statusText: 'Partially Online',
      statusColor: '#22c55e', // green-500
      dotColor: '#22c55e', // green-500
    };
  })();

  const dynamicStyles = {
    card: {
      backgroundColor: Colors.light.background,
      borderLeftColor: statusStyles.statusColor,
    },
    categoryName: {
      color: Colors.light.text,
    },
    statusText: {
      color: statusStyles.statusColor,
    },
    deviceCountText: {
      color: Colors.light.icon,
    },
    dot: {
      backgroundColor: statusStyles.dotColor,
    },
  };

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: `/devices/${category.id}`,
          params: { categoryName: category.name },
        })}
      style={[styles.card, dynamicStyles.card]}
    >
      <View style={styles.infoContainer}>
        <Text style={[styles.categoryName, dynamicStyles.categoryName]}>{category.name}</Text>
        <Text style={[styles.statusText, dynamicStyles.statusText]}>{statusStyles.statusText}</Text>
        <Text style={[styles.deviceCountText, dynamicStyles.deviceCountText]}>
          {onlineCount} of {category.deviceCount} devices online
        </Text>
      </View>

      {/* Dot Indicator */}
      <View style={[styles.dot, dynamicStyles.dot]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    marginHorizontal: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  infoContainer: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  deviceCountText: {
    fontSize: 12,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 16,
  },
});
