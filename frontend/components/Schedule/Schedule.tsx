import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  useWindowDimensions,
  // GestureResponderEvent,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

type ScheduleItem = {
  id: number;
  title: string;
  action: "On" | "Off";
  time: string;
  days?: string[];
  date?: string;
  enabled: boolean;
};

type DayLabel = {
  short: string;
  full: string;
};

export default function ScheduleScreen() {
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [selectedAction, setSelectedAction] = useState<"On" | "Off">("On");
  const [time, setTime] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [repeatDays, setRepeatDays] = useState<string[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Define the main brand color for text and active elements
  const DARK_BLUE = "#0D2C54";
  const LIGHT_GRAY = "#e9ecef";
  const WHITE = "#fff";

  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([
    {
      id: 1,
      title: "Main Conveyor Motor",
      action: "On",
      time: "08:00",
      days: ["S", "M", "Tu", "W", "Th", "F"],
      enabled: true,
    },
    {
      id: 2,
      title: "Workshop Lights",
      action: "Off",
      time: "22:00",
      days: ["S", "M", "Tu", "W", "Th", "F"],
      enabled: true,
    },
    {
      id: 3,
      title: "HVAC Unit 1",
      action: "On",
      time: "06:00",
      days: ["S", "M", "Tu", "W", "Th", "Sa"],
      enabled: false,
    },
    {
      id: 4,
      title: "Assembly Line 2",
      action: "On",
      time: "09:00",
      days: ["S", "M", "Tu", "W", "Th", "Sa"],
      enabled: true,
    },
  ]);

  const dayLabels: DayLabel[] = [
    { short: "S", full: "Sunday" },
    { short: "M", full: "Monday" },
    { short: "Tu", full: "Tuesday" },
    { short: "W", full: "Wednesday" },
    { short: "Th", full: "Thursday" },
    { short: "F", full: "Friday" },
    { short: "Sa", full: "Saturday" },
  ];

  const toggleDayInSchedule = (id: number, day: string) => {
    setScheduleData((prev) =>
      prev.map((item) => {
        if (item.id === id && Array.isArray(item.days)) {
          return {
            ...item,
            days: item.days.includes(day)
              ? item.days.filter((d) => d !== day)
              : [...item.days, day],
          };
        }
        return item;
      })
    );
  };

  const toggleRepeatDay = (day: string) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleEnabled = (id: number) => {
    setScheduleData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowTimePicker(false);
    if (selectedDate) setTime(selectedDate);
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const containerWidth = useWindowDimensions().width >= 768 ? "60%" : "100%";

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, { width: containerWidth }]}
      style={styles.container}
    >
      {/* <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={18} color="white" />
        <Text style={styles.addButtonText}>Add New Schedule</Text>
      </TouchableOpacity> */}

      <Text style={styles.header}>Current Schedules</Text>

      {scheduleData.map((item) => (
        <View
          key={item.id}
          style={[styles.card, !item.enabled && styles.disabledCard]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <View style={styles.icons}>
              <MaterialIcons
                name="edit"
                size={18}
                color="#6c757d"
                style={styles.icon}
              />
              <MaterialIcons
                name="delete"
                size={18}
                color="#dc3545"
                style={styles.icon}
              />
              <Switch
                value={item.enabled}
                onValueChange={() => toggleEnabled(item.id)}
              />
            </View>
          </View>
          <Text style={styles.cardSubText}>
            Turn <Text style={styles.bold}>{item.action}</Text> at{" "}
            <Text style={styles.bold}>{item.time}</Text>
          </Text>
          {item.date ? (
            <Text style={styles.dateText}>{item.date}</Text>
          ) : (
            <View style={styles.dayContainer}>
              {dayLabels.map((day) => {
                const isActive =
                  Array.isArray(item.days) && item.days.includes(day.short);
                // Dynamically set text color
                const dayTextColor = isActive ? WHITE : DARK_BLUE;

                return (
                  <TouchableOpacity
                    key={day.short}
                    style={[
                      styles.day,
                      isActive ? styles.activeDay : styles.inactiveDay,
                    ]}
                    onPress={() => toggleDayInSchedule(item.id, day.short)}
                  >
                    <Text style={[styles.dayText, { color: dayTextColor }]}>
                      {day.short}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      ))}

      <Text style={styles.header}>New Task</Text>
      <View style={styles.newTask}>
        <Text style={styles.label}>Device</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedDevice}
            onValueChange={(itemValue) => setSelectedDevice(itemValue)}
            style={styles.picker}
            dropdownIconColor={DARK_BLUE}
          >
            <Picker.Item label="Select a device to control" value="" />
            <Picker.Item label="Main Conveyor Motor" value="motor" />
            <Picker.Item label="Workshop Lights" value="lights" />
          </Picker>
        </View>

        <Text style={styles.label}>Action</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedAction}
            onValueChange={(itemValue) => setSelectedAction(itemValue)}
            style={styles.picker}
            dropdownIconColor={DARK_BLUE}
          >
            <Picker.Item label="Turn On" value="On" />
            <Picker.Item label="Turn Off" value="Off" />
          </Picker>
        </View>

        <Text style={styles.label}>Time</Text>
        <TouchableOpacity
          onPress={() => setShowTimePicker(true)}
          style={styles.input}
        >
          <Text>
            {time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <Text style={styles.label}>Repeat Task</Text>
        <View style={styles.dayContainer}>
          {dayLabels.map((day) => {
            const isActive = repeatDays.includes(day.short);
            // Dynamically set text color
            const dayTextColor = isActive ? WHITE : DARK_BLUE;

            return (
              <TouchableOpacity
                key={day.short}
                onPress={() => toggleRepeatDay(day.short)}
                style={[
                  styles.day,
                  isActive ? styles.activeDay : styles.inactiveDay,
                ]}
              >
                <Text style={[styles.dayText, { color: dayTextColor }]}>
                  {day.short}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}
        >
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scheduleButton}>
            <Text style={styles.scheduleText}>Schedule Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f4f6",
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    maxWidth: 600,
  },
  addButton: {
    backgroundColor: "#0D2C54",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "bold",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D2C54",
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    alignSelf: "center",
  },
  disabledCard: {
    backgroundColor: "#e9e9e9",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#0D2C54",
  },
  cardSubText: {
    marginTop: 6,
    color: "#6c757d",
  },
  bold: {
    fontWeight: "bold",
    color: "#0D2C54",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 4,
  },
  dayContainer: {
    flexDirection: "row",
    marginTop: 10,
    flexWrap: "wrap",
  },
  day: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  // --- STYLES MODIFIED HERE ---
  activeDay: {
    backgroundColor: "#0D2C54", // Dark Blue Background
  },
  inactiveDay: {
    backgroundColor: "#e9ecef", // Light Gray Background
  },
  // ---
  dayText: {
    fontWeight: "bold",
    fontSize: 12,
    // The color is now set dynamically in the component's JSX
  },
  newTask: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 0,
    alignSelf: "center",
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
    color: "#0D2C54",
  },
  pickerWrapper: {
    backgroundColor: "#f1f3f6",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  picker: {
    height: 50,
  },
  input: {
    backgroundColor: "#f1f3f6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  cancelButton: {
    marginRight: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelText: {
    color: "#0D2C54",
  },
  scheduleButton: {
    backgroundColor: "#0D2C54",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  scheduleText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dateText: {
    color: "#6c757d",
    marginTop: 6,
  },
});
