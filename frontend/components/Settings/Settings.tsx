import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// This component represents the Settings screen, built based on the provided screenshot.
// It has been updated to include an "Import Usage Data" option.
export default function SettingsScreen() {
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState('Jan 20, 2024 - Jul 27, 2025');

  const onDateChange = (event:React.BaseSyntheticEvent | undefined, selectedDate: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // Logic to update date range would go here
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.header}>Settings</Text>

      {/* Data & Servers Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Data & Servers</Text>
        <Text style={styles.cardSubtitle}>Manage your device data and server connections.</Text>

        {/* Import Usage Data */}
        <View style={styles.listItem}>
          <View style={styles.listItemLeft}>
            <Feather name="upload-cloud" size={20} color="#64748b" style={styles.icon} />
            <Text style={styles.listItemText}>Import Usage Data</Text>
          </View>
          <TouchableOpacity style={styles.importButton}>
            <Text style={styles.importButtonText}>Import CSV</Text>
          </TouchableOpacity>
        </View>

        {/* Export Usage Data */}
        <View style={styles.listItem}>
          <View style={styles.listItemLeft}>
            <Feather name="download" size={20} color="#64748b" style={styles.icon} />
            <Text style={styles.listItemText}>Export Usage Data</Text>
          </View>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportButtonText}>Export CSV</Text>
          </TouchableOpacity>
        </View>

        {/* Date Range */}
        <View style={[styles.listItem, { marginTop: 16 }]}>
          <Text style={styles.listItemText}>Date Range</Text>
        </View>
        <TouchableOpacity style={styles.datePickerInput} onPress={() => setShowDatePicker(true)}>
          <Ionicons name="calendar-outline" size={20} color="#64748b" />
          <Text style={styles.datePickerText}>{dateRange}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="default"
            // onChange={onDateChange}
          />
        )}

        {/* Manage Servers */}
        <View style={styles.listItem}>
          <View style={styles.listItemLeft}>
            <MaterialCommunityIcons name="database" size={20} color="#64748b" style={styles.icon} />
            <Text style={styles.listItemText}>Manage Servers</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#94a3b8" />
        </View>

        {/* Default Pairing Protocol */}
        <View style={[styles.listItem, { marginTop: 16, alignItems: 'center' }]}>
          <Text style={styles.listItemText}>Default Pairing Protocol</Text>
        </View>
        <View style={styles.radioGroup}>
          <TouchableOpacity style={styles.radioItem}>
            <Ionicons name="radio-button-on" size={20} color="#0ea5e9" />
            <Ionicons name="wifi" size={20} color="#0ea5e9" style={{ marginLeft: 8 }} />
            <Text style={styles.radioText}>Wi-Fi (Recommended)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioItem}>
            <Ionicons name="radio-button-off" size={20} color="#94a3b8" />
            <Ionicons name="bluetooth" size={20} color="#94a3b8" style={{ marginLeft: 8 }} />
            <Text style={styles.radioText}>Bluetooth</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.card}>
        <Text style={styles.cardTitle}>App Preferences</Text>
        <Text style={styles.cardSubtitle}>Customize the look and feel of the app.</Text>

        <View style={[styles.listItem, { marginTop: 16 }]}>
          <View style={styles.listItemLeft}>
            <Ionicons name="color-palette-outline" size={20} color="#64748b" style={styles.icon} />
            <Text style={styles.listItemText}>Appearance</Text>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue="System Default"
              style={styles.picker}
              dropdownIconColor="#64748b"
            >
              <Picker.Item label="System Default" value="system" />
              <Picker.Item label="Light" value="light" />
              <Picker.Item label="Dark" value="dark" />
            </Picker>
          </View>
        </View>

        <View style={[styles.listItem, { marginTop: 16 }]}>
          <View style={styles.listItemLeft}>
            <Ionicons name="language-outline" size={20} color="#64748b" style={styles.icon} />
            <Text style={styles.listItemText}>Language</Text>
          </View>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
              style={styles.picker}
              dropdownIconColor="#64748b"
            >
              <Picker.Item label="English" value="English" />
              <Picker.Item label="Spanish" value="Spanish" />
              <Picker.Item label="French" value="French" />
            </Picker>
          </View>
        </View>

        <View style={[styles.listItem, { marginTop: 16 }]}>
          <View style={styles.listItemLeft}>
            <MaterialCommunityIcons name="vibrate" size={20} color="#64748b" style={styles.icon} />
            <Text style={styles.listItemText}>Haptic Feedback</Text>
          </View>
          <Switch
            value={hapticFeedback}
            onValueChange={setHapticFeedback}
            trackColor={{ false: '#e5e7eb', true: '#0ea5e9' }}
            thumbColor={hapticFeedback ? '#fff' : '#fff'}
          />
        </View>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e3150',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 14,
    color: '#1e3150',
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  exportButton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  exportButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },
  importButton: {
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  importButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 14,
  },
  datePickerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  datePickerText: {
    marginLeft: 8,
    color: '#1e3150',
    fontSize: 14,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  radioText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#1e3150',
  },
  pickerWrapper: {
    backgroundColor: '#f1f3f6',
    borderRadius: 8,
    overflow: 'hidden',
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    height: 40,
    width: 150,
  },
});
