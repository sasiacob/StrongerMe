import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {Row, Text} from './common';
import {Colors, Spacing} from '../theme';
interface ISelectorProps {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}
const Selector = ({
  value,
  onChange,
  min = 0,
  max = 100,
  disabled = false,
}: ISelectorProps) => {
  const onIncrement = () => {
    if (value < max) onChange(value + 1);
  };
  const onDecrement = () => {
    if (value > min) onChange(value - 1);
  };
  if (disabled)
    return (
      <Row style={styles.row}>
        <View style={styles.valueContainer}>
          <Text style={styles.text}>{value}</Text>
        </View>
      </Row>
    );
  return (
    <Row style={styles.row}>
      <TouchableOpacity style={styles.iconContainer} onPress={onDecrement}>
        <Icon name="chevron-down" size={25} color={Colors.primary} />
      </TouchableOpacity>
      <View style={styles.valueContainer}>
        <Text style={styles.text}>{value}</Text>
      </View>
      <TouchableOpacity style={styles.iconContainer} onPress={onIncrement}>
        <Icon name="chevron-up" size={25} color={Colors.primary} />
      </TouchableOpacity>
    </Row>
  );
};

export default Selector;

const styles = StyleSheet.create({
  iconContainer: {
    padding: Spacing.small,
  },
  valueContainer: {
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
  row: {
    minHeight: 40,
  },
});
