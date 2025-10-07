import { Device } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Line, Path, Svg } from 'react-native-svg';

const devices: Device[] = [
  {
    id: '1',
    name: 'Main Conveyor Motor',
    status: 'Online',
    description: 'Output: 50A, 10.5 kWh',
    serverName: 'SERVER-A1',
    virtualIp: '201.174.12',
    ipAddress: '192.168.1.101',
    liveData: {
      current: '5.2 A',
      voltage: '221.5 V',
    },
    chartData: [220, 222, 219, 225, 221, 218, 223, 220, 226, 224],
  },
];

export const unstable_settings = {
  headerShown: false,
};

export default function DeviceDetailScreen() {
  const { detailId } = useLocalSearchParams();
  const router = useRouter();
  const device = devices.find((d) => d.id === detailId);

  if (!device) {
    return (
      <View style={styles.centeredView}>
        <Text style={styles.errorText}>Device not found!</Text>
      </View>
    );
  }

  // Voltage chart logic
  const chartData = device.chartData?.length ? device.chartData : [220, 221, 219, 222, 220];
  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);
  const range = maxValue - minValue || 1;
  const chartWidth = 300;
  const chartHeight = 120;

  const points = chartData
    .map((value, index) => {
      const x = (index / (chartData.length - 1)) * chartWidth;
      const y = chartHeight - ((value - minValue) / range) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      {/*
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#007aff" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.deviceName}>{device.name}</Text>
          <View style={[styles.statusBadge, device.status === 'Online' ? styles.online : styles.offline]}>
            <Text style={styles.statusText}>{device.status}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.shutdownButton}>
          <Text style={styles.shutdownText}>Shutdown</Text>
        </TouchableOpacity>
      </View>
      */}

      {/* Voltage Chart */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Voltage (Last 30 mins)</Text>
        
        <View style={styles.chartInfo}>
          <Text style={styles.chartText}>Min: {minValue} V</Text>
          <Text style={styles.chartText}>Max: {maxValue} V</Text>
        </View>
      </View>

      {/* Device Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Device Details</Text>
        {[
          ['Device ID', device.id],
          ['Server Name', device.serverName],
          ['Virtual IP', device.virtualIp],
          ['IP Address', device.ipAddress],
        ].map(([label, value], index) => (
          <View key={index} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}:</Text>
            <Text style={styles.detailValue}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Live Data */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Live Data</Text>
        {[
          ['Current', device.liveData.current],
          ['Voltage', device.liveData.voltage],
        ].map(([label, value], index) => (
          <View key={index} style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}:</Text>
            <Text style={styles.liveDataValue}>{value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorText: {
    fontSize: 18,
    color: '#6c757d',
    fontWeight: '500',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#343a40',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  online: {
    backgroundColor: '#28a745',
  },
  offline: {
    backgroundColor: '#dc3545',
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  shutdownButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  shutdownText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginBottom: 12,
  },
  chartInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  chartText: {
    fontSize: 14,
    color: '#6c757d',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f3f5',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#343a40',
  },
  liveDataValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007aff',
  },
});
