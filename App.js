import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Home from './src/screens/Home';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
