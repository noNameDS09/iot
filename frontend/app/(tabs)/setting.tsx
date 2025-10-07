import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SettingsScreen from '@/components/Settings/Settings';

const setting = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SettingsScreen />
    </SafeAreaView>
  );
};

export default setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
});
