import {StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';

interface IColumnProps extends ViewProps {
  spaceBetween?: boolean;
  children: React.ReactNode;
}

const Column = ({children, spaceBetween, style, ...props}: IColumnProps) => {
  return (
    <View
      {...props}
      style={[styles.row, spaceBetween && styles.spaceBetween, style]}>
      {children}
    </View>
  );
};

export default Column;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
});
