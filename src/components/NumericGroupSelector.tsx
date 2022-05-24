import {StyleSheet} from 'react-native';
import React from 'react';
import {Column, NumericSelector, Row, Text} from '.';
import {Spacing} from '../theme';

interface INumericGroupSelectorProps {
  values: number[];
  onValueChange: (newValue: number, index: number) => void;
}

const NumericGroupSelector = ({
  values,
  onValueChange,
}: INumericGroupSelectorProps) => {
  return (
    <Column>
      {values.map((element, index) => (
        <Row spaceBetween key={index} style={styles.repsRow}>
          <Text>Set {index}</Text>
          <NumericSelector
            onChange={newValue => onValueChange(newValue, index)}
            value={element}
          />
        </Row>
      ))}
    </Column>
  );
};

export default NumericGroupSelector;

const styles = StyleSheet.create({
  repsRow: {
    margin: Spacing.small,
  },
});
