import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Exercise} from '../API';
import {useDispatch} from 'react-redux';
import {addExercise} from '../store/slices/workoutSlice';
import {Button, Card, ExerciseDataInput, Input} from '../components';
import {Spacing} from '../theme';

const initialValue: Exercise = {
  sets: 4,
  weight: 20,
  category: '',
  reps: [12, 10, 8, 12],
  __typename: 'Exercise',
  id: '',
  name: '',
  createdAt: '',
  updatedAt: '',
};
const AddExerciseScreen = ({navigation}) => {
  const [exercise, setExercise] = useState<Exercise>(initialValue);
  const dispatch = useDispatch();

  const resetValues = () => {
    setExercise(initialValue);
  };
  const onNameChange = (text: string) => {
    const updated = {...exercise, name: text};
    setExercise(updated);
  };
  const onCategoryChange = (text: string) => {
    const updated = {...exercise, category: text};
    setExercise(updated);
  };
  const onSubmit = () => {
    try {
      const updatedItem: Exercise = {...exercise, id: Date.now().toString()};
      dispatch(addExercise(updatedItem));
      resetValues();
      navigation.pop();
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.list}>
        <Card>
          <Input onChangeText={onNameChange} label="Name" />
          <Input onChangeText={onCategoryChange} label="Category" />
          <ExerciseDataInput exercise={exercise} onUpdate={setExercise} />
        </Card>
      </ScrollView>

      <Button text="Add Exercise" onPress={onSubmit} />
    </View>
  );
};

export default AddExerciseScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: Spacing.base,
  },
  list: {
    flexGrow: 1,
  },
});
