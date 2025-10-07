import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import the new StatusCard module
import StatusCard from './Status';

// This component represents the Home screen.
// It combines the elements from your 'index.tsx' and the screenshots.
export default function HomeScreen({ onLogout }: any) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 0, paddingHorizontal: 16, paddingTop: insets.top }}
    >
      {/* Greeting Section */}
      <View style={styles.greetingContainer}>
        <View>
          <Text style={styles.greetingTitle}>Hi, Ayush</Text>
          <Text style={styles.greetingSubtitle}>Welcome back to Aura</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={onLogout}>
          <Ionicons name="person-outline" size={20} color="#1e3150" />
        </TouchableOpacity>
      </View>

      {/* Factory Overview Cards (now using the new StatusCard component) */}
      <View style={styles.cardContainer}>
        <View style={styles.overviewHeader}>
          <Text style={styles.overviewTitle}>Factory Overview</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        <StatusCard
          title="Devices Online"
          value="172"
          iconName="shield-checkmark-outline"
          iconColor="#22c55e"
        />
        <StatusCard title="kWh Today" value="1,842" iconName="flash-outline" iconColor="#3b82f6" />
        <StatusCard
          title="Active Alerts"
          value="3"
          iconName="alert-circle-outline"
          iconColor="#ef4444"
        />
      </View>

      {/* Schedule Calendar Section */}
      <View style={[styles.card, { padding: 0 }]}>
        <View style={{ padding: 16, paddingBottom: 0 }}>
          <Text style={styles.cardHeader}>Schedule</Text>
        </View>
        <Calendar
          style={styles.calendar}
          markingType="custom"
          markedDates={{
            '2025-08-04': {
              customStyles: {
                container: { backgroundColor: '#ABC7E3', borderRadius: 8 },
                text: { color: '#fff' },
              },
            },
          }}
          theme={{
            backgroundColor: '#fff',
            calendarBackground: '#fff',
            textSectionTitleColor: '#64748b',
            todayTextColor: '#73bdfa',
            dayTextColor: '#1e3150',
            textDisabledColor: '#cbd5e1',
            monthTextColor: '#1e3150',
            arrowColor: '#1e293b',
          }}
        />
      </View>

      {/* Top Consumers Card */}
      <View style={styles.card}>
        <View style={styles.listHeader}>
          <Text style={styles.cardHeader}>Top Consumers Today</Text>
          <Feather name="trending-up" size={18} color="#64748b" />
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>1. Main Conveyor</Text>
          <Text style={styles.listItemValue}>240 kWh</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>2. HVAC Unit 1</Text>
          <Text style={styles.listItemValue}>180 kWh</Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>3. Welding Robot 3</Text>
          <Text style={styles.listItemValue}>155 kWh</Text>
        </View>
      </View>

      {/* Upcoming Events Card */}
      <View style={styles.card}>
        <View style={styles.listHeader}>
          <Text style={styles.cardHeader}>Coming Up Next</Text>
          <Feather name="clock" size={18} color="#64748b" />
        </View>
        <Text style={styles.eventText}>
          Workshop Lights scheduled to turn ON <Text style={{ color: '#9fabc0' }}>in 45m</Text>
        </Text>
        <Text style={styles.eventText}>
          Assembly Line 2 scheduled maintenance <Text style={{ color: '#9fabc0' }}>in 2h 30m</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1e3150',
  },
  greetingSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  profileButton: {
    backgroundColor: '#e2e8f0',
    padding: 10,
    borderRadius: 999,
  },
  cardContainer: {
    marginBottom: 20,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3150',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    marginRight: 4,
  },
  liveText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#22c55e',
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e3150',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  listItemText: {
    fontSize: 14,
    color: '#64748b',
  },
  listItemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e3150',
  },
  eventText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  calendar: {
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#fff',
    margin: 0
  },
});
