import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './app/AppNavigator';
import { StyleSheet } from 'react-native';

const RootApp: React.FC = () => (
  <GestureHandlerRootView style={styles.flex}>
    <AppNavigator />
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  flex: {
    flex: 1
  }
});

export default RootApp;