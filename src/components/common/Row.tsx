import {StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';

interface IRowProps extends ViewProps {
  spaceBetween?: boolean;
  children: React.ReactNode;
}

const Row = ({children, spaceBetween, style, ...props}: IRowProps) => {
  return (
    <View
      {...props}
      style={[styles.row, spaceBetween && styles.spaceBetween, style]}>
      {children}
    </View>
  );
};

export default Row;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
});
