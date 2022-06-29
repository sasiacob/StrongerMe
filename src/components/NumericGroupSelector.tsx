import {StyleSheet} from 'react-native';
import React from 'react';
import {Column, NumericSelector, Row, Text} from '.';
import {Spacing} from '../theme';
import {useState} from 'react';
import {useEffect} from 'react';

interface INumericGroupSelectorProps {
  values: number[];
  onRepsChange: (newValue: number, index: number) => void;
  onAvgWeightChange?: (newValue: number) => void;
  initialWeight?: number;
  disabled?: boolean;
  isDetailedMode?: boolean;
}

const NumericGroupSelector = ({
  values,
  onRepsChange,
  onAvgWeightChange,
  disabled = false,
  isDetailedMode = false,
  initialWeight = 20,
}: INumericGroupSelectorProps) => {
  const [weights, setWeights] = useState<number[]>(
    Array(values.length).fill(initialWeight),
  );
  const onWeightChange = (newValue: number, index: number) => {
    const newArray = [...weights];
    newArray[index] = newValue;
    setWeights(newArray);
  };
  useEffect(() => {
    if (isDetailedMode && onAvgWeightChange) {
      const average = weights.reduce((a, b) => a + b) / weights.length;
      onAvgWeightChange!(average);
    }
  }, [weights, isDetailedMode, onAvgWeightChange]);
  useEffect(() => {
    if (values.length > weights.length) {
      setWeights(c => [...c, initialWeight]);
    } else if (values.length < weights.length) {
      setWeights(c => c.splice(-1));
    }
  }, [values.length, weights.length, initialWeight]);
  return (
    <Column>
      {values.map((element, index) => (
        <Row spaceBetween key={index} style={styles.repsRow}>
          <Text>Set {index}</Text>
          <NumericSelector
            disabled={disabled}
            onChange={newValue => onRepsChange(newValue, index)}
            value={element}
          />
          {isDetailedMode ? (
            <Column>
              <NumericSelector
                disabled={disabled}
                onChange={newValue => onWeightChange(newValue, index)}
                value={weights[index]}
              />
            </Column>
          ) : null}
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
