import {StyleSheet, View} from 'react-native';
import React from 'react';

interface ICenterProps {
  children: React.ReactNode;
  fill?: boolean;
}
const Center = ({children, fill}: ICenterProps) => {
  return (
    <View style={[styles.center, fill && styles.fill]}>
      {React.Children.only(children)}
    </View>
  );
};

export default Center;

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    flex: 1,
  },
});
