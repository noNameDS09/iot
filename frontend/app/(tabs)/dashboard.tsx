import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const horizontalPadding = 16 * 2;

// Interfaces
interface EnergyDay {
  date: string;
  kWh: number;
}

interface DeviceUsage {
  device: string;
  kWh: number;
}

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const [energyHistory, setEnergyHistory] = useState<EnergyDay[]>([]);
  const [topDevices, setTopDevices] = useState<DeviceUsage[]>([]);
  const [loading, setLoading] = useState(true);

  // Backend IP/host
  const API_BASE = 'http://localhost:5000'; // Change to your backend IP

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyRes, devicesRes] = await Promise.all([
          fetch(`${API_BASE}/energy/history`),
          fetch(`${API_BASE}/energy/top-consumers`),
        ]);

        const history = await historyRes.json();
        const devices = await devicesRes.json();

        setEnergyHistory(history);
        setTopDevices(devices);
      } catch (err) {
        console.error('Error fetching energy data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Simulated Heatmap
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const generateUsageGrid = () =>
    days.map(() =>
      hours.map(() => {
        const isActive = Math.random() > 0.6;
        const intensity = Math.floor(Math.random() * 3);
        return isActive ? intensity : null;
      })
    );

  const usageGrid = generateUsageGrid();

  // Line Chart Data
  const lineChartData = {
    labels: energyHistory.map((entry) => entry.date.split('-')[2]), // Show day only
    datasets: [{ data: energyHistory.map((entry) => entry.kWh) }],
  };

  // Pie Chart Data
  const pieColors = ['#facc15', '#22c55e', '#ef4444', '#3b82f6', '#a855f7'];
  const pieChartData = topDevices.map((item, i) => ({
    name: item.device,
    population: item.kWh,
    color: pieColors[i % pieColors.length],
    legendFontColor: '#000',
    legendFontSize: 14,
  }));

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text>Loading Dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'white', paddingTop: insets.top }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
    >
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>
        Analytics
      </Text>

      {/* Line Chart */}
      <View
        style={{
          backgroundColor: '#f3f4f6',
          borderRadius: 16,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
          Energy Usage (Last 7 Days)
        </Text>
        <LineChart
          data={lineChartData}
          width={screenWidth - horizontalPadding - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: () => '#3b82f6',
            labelColor: () => '#000000',
            strokeWidth: 2,
            decimalPlaces: 0,
          }}
          bezier
          style={{ borderRadius: 12 }}
        />
      </View>

      {/* Pie Chart */}
      <View
        style={{
          backgroundColor: '#f3f4f6',
          borderRadius: 16,
          padding: 16,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
          Top Device Consumption
        </Text>
        <PieChart
          data={pieChartData}
          width={screenWidth - horizontalPadding - 32}
          height={220}
          chartConfig={{ color: () => '#000' }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Heatmap */}
      <View
        style={{
          backgroundColor: '#f3f4f6',
          borderRadius: 16,
          padding: 16,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
          Peak Usage Hours (Simulated)
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 8, marginLeft: 20 }}>
              {hours.map((hour) => (
                <Text
                  key={`hour-${hour}`}
                  style={{
                    width: 24,
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#6b7280',
                  }}
                >
                  {hour.toString().padStart(2, '0')}
                </Text>
              ))}
            </View>
            {usageGrid.map((row, rowIndex) => (
              <View key={`row-${rowIndex}`} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ width: 20, fontSize: 12, marginRight: 4 }}>{days[rowIndex]}</Text>
                {row.map((cell, colIndex) => {
                  let bgColor = '#e5e7eb';
                  if (cell === 1) bgColor = '#60a5fa';
                  if (cell === 2) bgColor = '#ef4444';
                  return (
                    <View
                      key={`cell-${rowIndex}-${colIndex}`}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 4,
                        borderRadius: 4,
                        backgroundColor: bgColor,
                      }}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
