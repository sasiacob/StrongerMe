import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Exercise} from '../API';
import {
  Button,
  Card,
  Column,
  Divider,
  ExerciseDataInput,
  Input,
  Row,
  Text,
} from '../components';
import {addExercise, updateExercise} from '../store/slices/workoutSlice';
import {Spacing} from '../theme';

const ExerciseDetailsScreen = ({route}) => {
  const initialValue = route.params.exercise;
  const [exercise, setExercise] = useState<Exercise>(initialValue);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
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
  const toggleEdit = () => setIsEditMode(c => !c);
  const onSubmit = () => {
    try {
      dispatch(updateExercise(exercise));
      setIsEditMode(false);
    } catch (error) {
      console.warn(error);
    }
  };
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.list}>
        <Card>
          <Input
            editable={isEditMode}
            value={exercise.name}
            onChangeText={onNameChange}
            label="Name"
          />
          <Input
            editable={isEditMode}
            value={exercise.category}
            onChangeText={onCategoryChange}
            label="Category"
          />

          <ExerciseDataInput editable={isEditMode} exercise={exercise} onUpdate={setExercise} />
        </Card>
      </ScrollView>

      {isEditMode ? (
        <Row style={styles.row} spaceBetween>
          <Button text="Cancel" onPress={toggleEdit} />
          <Button text="Submit" onPress={onSubmit} />
        </Row>
      ) : (
        <Button text="Edit" onPress={toggleEdit} />
      )}
    </View>
  );
};

export default ExerciseDetailsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: Spacing.base,
  },
  list: {
    flexGrow: 1,
  },
  row: {
    paddingVertical: Spacing.base,
  },
});
