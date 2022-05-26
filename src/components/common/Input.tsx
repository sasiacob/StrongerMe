import {StyleSheet, TextInput, TextInputProps, TextStyle} from 'react-native';
import React from 'react';
import {Colors, fontSize, Spacing} from '../../theme';
import {Column, Text} from '.';

interface IInputProps extends TextInputProps {
  label?: string;
  labelStyle?: TextStyle;
}

const Input = ({label, labelStyle, style, ...props}: IInputProps) => {
  return (
    <Column style={styles.wrapper}>
      {label != null && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TextInput
        placeholderTextColor={Colors.onPrimary + Colors.semiTransparent}
        {...props}
        style={[styles.input, style]}
      />
    </Column>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.onPrimary + Colors.semiTransparent,
    padding: Spacing.base,
  },
  label: {
    fontSize: fontSize.small,
  },
  wrapper: {
    marginVertical: Spacing.small,
  },
});
