import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScheduleScreen from '@/components/Schedule/Schedule';

const schedule = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScheduleScreen />
    </SafeAreaView>
  );
};

export default schedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});
