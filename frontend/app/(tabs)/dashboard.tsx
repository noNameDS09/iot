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

interface EnergyDay {
  date: string;
  kWh: number;
}

interface DeviceUsage {
  device: string;
  kWh: number;
}

interface HourlyUsage {
  day: number;
  hour: number;
  kWh: number;
}

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const [energyHistory, setEnergyHistory] = useState<EnergyDay[]>([]);
  const [topDevices, setTopDevices] = useState<DeviceUsage[]>([]);
  const [hourlyUsage, setHourlyUsage] = useState<HourlyUsage[]>([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'http://localhost:5000'; // replace with your backend IP

  useEffect(() => {
    async function fetchData() {
      try {
        const [historyRes, devicesRes, hourlyRes] = await Promise.all([
          fetch(`${API_BASE}/energy/history`),
          fetch(`${API_BASE}/energy/top-consumers`),
          fetch(`${API_BASE}/energy/hourly-usage`),
        ]);

        const history = await historyRes.json();
        const devices = await devicesRes.json();
        const hourly = await hourlyRes.json();

        setEnergyHistory(Array.isArray(history) ? history : []);
        setTopDevices(Array.isArray(devices) ? devices : []);
        setHourlyUsage(Array.isArray(hourly) ? hourly : []);
      } catch (err) {
        console.error('Error fetching energy data:', err);
        setEnergyHistory([]);
        setTopDevices([]);
        setHourlyUsage([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: insets.top,
        }}
      >
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  // Data for Line Chart
  const lineChartData = {
    labels: energyHistory.map((e) => e.date.split('-')[2] || ''),
    datasets: [{ data: energyHistory.map((e) => e.kWh) }],
  };

  // Data for Pie Chart
  const pieColors = ['#facc15', '#22c55e', '#ef4444', '#3b82f6', '#a855f7'];
  const pieChartData = topDevices.map((item, i) => ({
    name: item.device,
    population: item.kWh,
    color: pieColors[i % pieColors.length],
    legendFontColor: '#000',
    legendFontSize: 14,
  }));

  // Heatmap setup
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const usageGrid = days.map((_, dayIndex) =>
    hours.map((hour) => {
      const record = hourlyUsage.find(
        (r) => r.day === dayIndex && r.hour === hour
      );
      if (!record) return null;
      if (record.kWh > 50) return 2;
      if (record.kWh > 20) return 1;
      return null;
    })
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#f3f4f6', // light gray background
        paddingTop: insets.top,
      }}
      contentContainerStyle={{
        paddingBottom: 32,
        paddingHorizontal: 16,
      }}
    >
      {/* Main Title */}
      <Text
        style={{
          fontWeight: '700',
          fontSize: 26,
          color: '#111827',
          marginBottom: 16,
          marginTop: 10,
        }}
      >
        Analytics
      </Text>

      {/* Energy Usage Chart */}
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 12,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 4,
        }}
      >
        <Text
          style={{
            fontWeight: '600',
            fontSize: 18,
            color: '#1e3a8a',
            marginBottom: 8,
          }}
        >
          Energy Usage (Last 7 Days)
        </Text>

        <LineChart
          data={lineChartData}
          width={screenWidth - horizontalPadding}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(37, 99, 235, ${opacity})`,
            labelColor: () => '#1e3a8a',
            propsForDots: { r: '5', strokeWidth: '2', stroke: '#2563eb' },
          }}
          bezier
          style={{
            borderRadius: 12,
          }}
        />
      </View>

      {/* Top Device Consumption */}
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 12,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 4,
        }}
      >
        <Text
          style={{
            fontWeight: '600',
            fontSize: 18,
            color: '#1e3a8a',
            marginBottom: 8,
          }}
        >
          Top Device Consumption
        </Text>

        <PieChart
          data={pieChartData}
          width={screenWidth - horizontalPadding}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: () => '#2563eb',
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
        />
      </View>

      {/* Peak Usage Hours (Simulated) */}
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 12,
          padding: 12,
          marginBottom: 24,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 4,
        }}
      >
        <Text
          style={{
            fontWeight: '600',
            fontSize: 18,
            color: '#1e3a8a',
            marginBottom: 10,
            alignSelf: 'flex-start',
          }}
        >
          Peak Usage Hours 
        </Text>

        {/* Hour Labels */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 6,
            marginLeft: 28,
          }}
        >
          {hours.map((hour) => (
            <Text
              key={hour}
              style={{
                fontSize: 10,
                width: 22,
                textAlign: 'center',
                color: '#555',
              }}
            >
              {hour.toString().padStart(2, '0')}
            </Text>
          ))}
        </View>

        {/* Day Rows */}
        {usageGrid.map((dayRow, dayIndex) => (
          <View
            key={dayIndex}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            {/* Day Label */}
            <Text
              style={{
                width: 20,
                fontWeight: '600',
                fontSize: 12,
                color: '#333',
                marginRight: 4,
                textAlign: 'center',
              }}
            >
              {days[dayIndex]}
            </Text>

            {/* Hour Squares */}
            {dayRow.map((intensity, hourIndex) => {
              let bgColor = '#e5e7eb'; // default (light gray)
              if (intensity === 1) bgColor = '#60a5fa'; // blue = medium usage
              else if (intensity === 2) bgColor = '#ef4444'; // red = high usage

              return (
                <View
                  key={hourIndex}
                  style={{
                    width: 22,
                    height: 22,
                    marginHorizontal: 2,
                    backgroundColor: bgColor,
                    borderRadius: 6,
                  }}
                />
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
