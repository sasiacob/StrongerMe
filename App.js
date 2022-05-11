import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import MainNavigator from './src/navigation/MainNavigator';
import Home from './src/screens/HomeScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <MainNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
