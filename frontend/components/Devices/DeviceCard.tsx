import React, { useState } from 'react';
import { TouchableOpacity, Text, View, Switch, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Device } from '../../types/types';
import { Colors } from '@/constants/Colors';

interface DeviceCardProps {
  device: Device;
  categoryId: string;
}

export default function DeviceCard({ device, categoryId }: DeviceCardProps) {
  const router = useRouter();

  // Local state to manage switch (override props.device.status)
  const [isOnline, setIsOnline] = useState(device.status === 'Online');

  const dynamicStyles = {
    card: {
      borderLeftColor: isOnline ? '#22c55e' : '#ef4444', // green-500 or red-500
    },
    statusText: {
      color: isOnline ? '#16a34a' : '#dc2626', // green-600 or red-600
    },
  };

  const getDeviceIcon = (name: string) => {
    if (name.includes('Motor')) return '⚙️';
    if (name.includes('Sensor')) return '📡';
    if (name.includes('Camera')) return '📷';
    return '🔧';
  };

  const handleToggle = async () => {
    const newStatus = !isOnline;

    // Optional: Simulate API call
    try {
      // Simulate success delay
      // await yourApi.toggleDeviceStatus(device.id, newStatus); ← real API call
      setIsOnline(newStatus);
    } catch (error) {
      Alert.alert('Error', 'Failed to update device status.');
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, dynamicStyles.card]}
      onPress={() => router.push(`/devices/${categoryId}/${device.id}`)}
    >
      <View style={styles.infoContainer}>
        {/* Icon */}
        <View style={styles.iconWrapper}>
          <Text style={styles.iconText}>{getDeviceIcon(device.name)}</Text>
        </View>

        {/* Info */}
        <View style={styles.textContainer}>
          <Text style={styles.deviceName}>{device.name}</Text>
          <Text style={[styles.statusText, dynamicStyles.statusText]}>
            {isOnline ? 'Online' : 'Offline'}
          </Text>
          <Text style={styles.deviceDescription}>{device.description}</Text>
        </View>
      </View>

      <View style={styles.switchContainer}>
        <Switch
          value={isOnline}
          onValueChange={handleToggle}
          trackColor={{ false: '#d1d5db', true: '#10b981' }}
          thumbColor={isOnline ? '#ffffff' : '#f3f4f6'}
          ios_backgroundColor="#d1d5db"
        />
      </View>
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
    backgroundColor: Colors.light.background,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    backgroundColor: '#dbeafe', // blue-100
    borderRadius: 24,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text, // zinc-900
  },
  statusText: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: '500',
  },
  deviceDescription: {
    fontSize: 12,
    color: Colors.light.icon, // zinc-500
    marginTop: 2,
  },
  switchContainer: {
    alignItems: 'flex-end',
    // The gap property is not supported in React Native StyleSheet.
    // If spacing is needed, add margin to the Switch or its children.
  },
});
