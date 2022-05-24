import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ColorTheme} from '../../theme/theme.interface';
import {Colors, Spacing} from '../../theme';

interface IDividerProps {
  width?: number;
  color?: string;
}

const Divider = ({color, width}: IDividerProps) => {
  return (
    <View
      style={[ styles.container, 
        width ? {borderBottomWidth: width} : styles.defaultWidth,
        color ? {borderBottomColor: color} : styles.defaultColor,
      ]}
    />
  );
};

export default Divider;

const styles = StyleSheet.create({
  container:{
    marginVertical:Spacing.small
  },
  defaultWidth: {
    borderBottomWidth: 1,
  },
  defaultColor: {
    borderBottomColor: Colors.onPrimary + Colors.semiTransparent,
  },
});
