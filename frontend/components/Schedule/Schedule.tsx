import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  useWindowDimensions,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

// --- Type Definitions ---
type Action = "On" | "Off";

type ScheduleItem = {
  id: number;
  title: string;
  action: Action;
  time: string; // "HH:MM"
  days?: string[]; // Short day codes (e.g., 'M', 'Tu')
  date?: string; // Date string for one-time events (YYYY-MM-DD)
  enabled: boolean;
};

type DayLabel = {
  short: string;
  full: string;
};

// --- Main Component ---

export default function ScheduleScreen() {
  // --- Constants and Styles Helpers ---
  const DARK_BLUE = "#0D2C54";
  const WHITE = "#fff";

  const containerWidth = useWindowDimensions().width >= 768 ? "60%" : "100%";

  const dayLabels: DayLabel[] = [
    { short: "S", full: "Sunday" },
    { short: "M", full: "Monday" },
    { short: "Tu", full: "Tuesday" },
    { short: "W", full: "Wednesday" },
    { short: "Th", full: "Thursday" },
    { short: "F", full: "Friday" },
    { short: "Sa", full: "Saturday" },
  ];

  // --- Initial Data (Simulated Local Storage) ---
  const initialData: ScheduleItem[] = [
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
  ];

  // --- State Variables ---
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>(initialData);
  const [nextId, setNextId] = useState(initialData.length + 1);

  // New Task Form State
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [selectedAction, setSelectedAction] = useState<Action>("On");
  const [time, setTime] = useState<Date>(new Date());
  const [repeatDays, setRepeatDays] = useState<string[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Editing State: Tracks which ID is currently being modified in the form
  const [editingId, setEditingId] = useState<number | null>(null);

  // --- CRUD and Helper Functions ---

  /** Clears and resets the new task form. Used by Cancel and after Save. */
  const resetForm = () => {
    setEditingId(null);
    setSelectedDevice("");
    setSelectedAction("On");
    setTime(new Date());
    setRepeatDays([]);
    setDate(new Date());
  };

  /**
   * Handles both creating a new schedule and saving changes to an existing one.
   * Connected to the "Schedule Task" / "Save Changes" button.
   */
  const handleScheduleTask = () => {
    if (!selectedDevice) {
      Alert.alert("Validation Error", "Please select a device.");
      return;
    }

    const timeString = time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const isRecurring = repeatDays.length > 0;

    // Create title based on selected device value
    const deviceTitles: { [key: string]: string } = {
      motor: "Main Conveyor Motor",
      lights: "Workshop Lights",
    };
    const deviceTitle = deviceTitles[selectedDevice] || selectedDevice;

    const newSchedule: ScheduleItem = {
      id: editingId !== null ? editingId : nextId,
      title: deviceTitle,
      action: selectedAction,
      time: timeString,
      days: isRecurring ? repeatDays : undefined,
      date: !isRecurring ? date.toISOString().split("T")[0] : undefined,
      enabled: true,
    };

    setScheduleData((prev) => {
      if (editingId !== null) {
        // UPDATE existing schedule
        return prev.map((item) => (item.id === editingId ? newSchedule : item));
      } else {
        // CREATE new schedule
        setNextId((prevId) => prevId + 1);
        return [...prev, newSchedule];
      }
    });

    resetForm();
    Alert.alert(
      "Success",
      `${editingId !== null ? "Changes saved" : "Task scheduled"} successfully.`
    );
  };

  /**
   * Populates the New Task form with data from a selected schedule card.
   * Connected to the "Edit" icon.
   */
  const handleEditTask = (id: number) => {
    const item = scheduleData.find((s) => s.id === id);
    if (item) {
      setEditingId(item.id);

      const deviceValue = item.title.includes("Motor")
        ? "motor"
        : item.title.includes("Lights")
        ? "lights"
        : item.title;
      setSelectedDevice(deviceValue);

      setSelectedAction(item.action);

      const [hours, minutes] = item.time.split(":").map(Number);
      const newTime = new Date();
      newTime.setHours(hours, minutes, 0, 0);
      setTime(newTime);

      setRepeatDays(item.days || []);

      setDate(item.date ? new Date(item.date) : new Date());
    }
  };

  /**
   * Deletes a schedule item after confirmation.
   * Connected to the "Delete" icon.
   */
  const handleDeleteTask = (id: number, title: string) => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete the schedule for "${title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setScheduleData((prev) => prev.filter((item) => item.id !== id));
            if (editingId === id) {
              resetForm();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  /** Toggles the enabled state of a schedule. Connected to the Switch. */
  const toggleEnabled = (id: number) => {
    setScheduleData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  /** Toggles a day on an existing schedule item. Used for quick-toggle on cards. */
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

  /** Toggles selected days for the New Task form. */
  const toggleRepeatDay = (day: string) => {
    setRepeatDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  // --- DateTimePicker Handlers ---

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

  // --- Render Logic ---

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, { width: containerWidth }]}
      style={styles.container}
    >
      <Text style={styles.header}>Current Schedules</Text>

      {/* --- NO RUNNING TASKS MESSAGE --- */}
      {scheduleData.length === 0 ? (
        <Text style={styles.noTasksMessage}>
          No running tasks. Start by scheduling a new one below! 📝
        </Text>
      ) : (
        /* --- SCHEDULES LIST --- */
        scheduleData.map((item) => {
          const isActive = item.id === editingId;

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                !item.enabled && styles.disabledCard,
                isActive && styles.editingCard,
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.icons}>
                  <TouchableOpacity onPress={() => handleEditTask(item.id)}>
                    <MaterialIcons
                      name="edit"
                      size={18}
                      color={isActive ? DARK_BLUE : "#6c757d"}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDeleteTask(item.id, item.title)}
                  >
                    <MaterialIcons
                      name="delete"
                      size={18}
                      color="#dc3545"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
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
                <Text style={styles.dateText}>On {item.date}</Text>
              ) : (
                <View style={styles.dayContainer}>
                  {dayLabels.map((day) => {
                    const dayIsActive =
                      Array.isArray(item.days) && item.days.includes(day.short);

                    return (
                      <TouchableOpacity
                        key={day.short}
                        // --- QUICK TOGGLE RESTORED HERE ---
                        onPress={() => toggleDayInSchedule(item.id, day.short)}
                        style={[
                          styles.day,
                          dayIsActive ? styles.activeDay : styles.inactiveDay,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dayText,
                            { color: dayIsActive ? WHITE : DARK_BLUE },
                          ]}
                        >
                          {day.short}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })
      )}

      <Text style={styles.header}>
        {editingId !== null ? "Edit Task" : "New Task"}
      </Text>
      <View style={styles.newTask}>
        <Text style={styles.label}>Device</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedDevice}
            onValueChange={(itemValue) =>
              setSelectedDevice(itemValue as string)
            }
            style={styles.picker}
            dropdownIconColor={DARK_BLUE}
          >
            <Picker.Item label="Select a device to control" value="" />
            <Picker.Item label="Main Conveyor Motor" value="motor" />
            <Picker.Item label="Workshop Lights" value="lights" />
            <Picker.Item label="HVAC Unit 1" value="HVAC Unit 1" />
            <Picker.Item label="Assembly Line 2" value="Assembly Line 2" />
          </Picker>
        </View>

        <Text style={styles.label}>Action</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedAction}
            onValueChange={(itemValue) =>
              setSelectedAction(itemValue as Action)
            }
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

        {/* Show Date only if no repeat days are selected */}
        {repeatDays.length === 0 && (
          <>
            <Text style={styles.label}>Date (One-time Schedule)</Text>
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
          </>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={resetForm} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleScheduleTask}
            style={styles.scheduleButton}
          >
            <Text style={styles.scheduleText}>
              {editingId !== null ? "Save Changes" : "Schedule Task"}
            </Text>
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
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D2C54",
    marginBottom: 12,
    textAlign: "center",
  },
  // --- NEW STYLE ---
  noTasksMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  // ---
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
    borderWidth: 1,
    borderColor: "transparent",
  },
  editingCard: {
    borderColor: "#0D2C54",
    borderWidth: 2,
  },
  disabledCard: {
    backgroundColor: "#e9e9e9",
    opacity: 0.7,
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
    marginHorizontal: 8,
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
  activeDay: {
    backgroundColor: "#0D2C54",
  },
  inactiveDay: {
    backgroundColor: "#e9ecef",
  },
  dayText: {
    fontWeight: "bold",
    fontSize: 12,
  },
  newTask: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
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
    justifyContent: "center",
    height: 50,
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
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#0D2C54",
  },
  cancelText: {
    color: "#0D2C54",
    fontWeight: "bold",
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
