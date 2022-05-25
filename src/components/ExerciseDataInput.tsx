import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Exercise} from '../API';
import {
  Text,
  Input,
  Row,
  Divider,
  NumericSelector,
  NumericGroupSelector,
} from '.';

interface IExerciseDataInputProps {
  exercise: Exercise;
  onUpdate: (updatedItem: Exercise) => void;
  editable?: boolean;
}

const ExerciseDataInput = ({
  exercise,
  onUpdate,
  editable = true,
}: IExerciseDataInputProps) => {
  const validNumber = (text: string) => {
    const value = parseInt(text);
    if (isNaN(value)) {
      return null;
    } else return value;
  };
  const onWeightChange = (text: string) => {
    const value = validNumber(text);
    onUpdate({...exercise, weight: value});
  };
  const onSetsChange = (value: number) => {
    if (value >= 1 && value < 10) {
      //REPS LENGTH MUST BE EQUAL TO SETS
      // IF SETS < 0, TAKE FIRST [SETS] REPS, ELSE PUT NEW (10);
      let repsArray = exercise.reps;
      if (repsArray.length > value) {
        repsArray = repsArray.slice(0, value);
      } else if (repsArray.length < value) {
        const difference = value - repsArray.length;
        const newArray: number[] = Array(difference).fill(10);
        repsArray = [...repsArray, ...newArray];
      }

      onUpdate({...exercise, sets: value, reps: repsArray});
    }
  };
  const onRepsChange = (newValue: number, index: number) => {
    // COPY ARRAY OF REPS AND REPLACE AT SPECIFIC INDEX
    const repsArray = exercise.reps.map((rep, i) => {
      if (index == i) {
        return newValue;
      }
      return rep;
    });
    onUpdate({...exercise, reps: repsArray});
  };

  return (
    <View>
      <Input
        editable={editable}
        onChangeText={onWeightChange}
        label="Weight"
        value={exercise.weight?.toString() ?? ''}
        keyboardType={'numeric'}
      />
      <Row spaceBetween>
        <Text>Sets</Text>
        <NumericSelector
          value={exercise.sets}
          disabled={!editable}
          onChange={onSetsChange}
        />
      </Row>
      <Divider />
      <Text strong>Reps</Text>
      <NumericGroupSelector
        disabled={!editable}
        values={exercise.reps}
        onValueChange={onRepsChange}
      />
    </View>
  );
};

export default ExerciseDataInput;

const styles = StyleSheet.create({});
