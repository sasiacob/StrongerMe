import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Card, CheckBox, Column, Input, Row, Text} from '../components';
import {Workout} from '../API';
import {useSelector, useDispatch} from 'react-redux';
import {updateWorkout, workoutSelector} from '../store/slices/workoutSlice';

import {lightTheme, Spacing} from '../theme';
const WorkoutDetailsScreen = ({route, navigation}) => {
  const [workout, setWorkout] = useState<Workout>(route.params.workout);
  const initialIndexes: string[] = route.params.workout.exercises.map(
    el => el.id,
  );
  const [selectedIds, setSelectedIds] = useState<string[]>(initialIndexes);
  const [isEditMode, setIsEditMode] = useState(false);
  const {exercises} = useSelector(workoutSelector);

  const dispatch = useDispatch();
  async function onSubmit() {
    try {
      const selectedExercises = exercises.filter(item =>
        selectedIds.includes(item.id),
      );
      const updatedItem: Workout = {...workout, exercises: selectedExercises};
      dispatch(updateWorkout(updatedItem));
      disableEdit();
      navigation.pop();
    } catch (e) {
      console.log('error: ', e);
    }
  }

  const toggleSelected = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(c => c.filter(i => i != id));
    } else {
      setSelectedIds(c => [...c, id]);
    }
  };

  const onNameChange = (text: string) => {
    setWorkout(current => {
      return {...current, title: text};
    });
  };

  const enableEdit = () => {
    setIsEditMode(true);
  };
  const disableEdit = () => {
    setIsEditMode(false);
  };
  return (
    <View style={styles.wrapper}>
      <Card style={lightTheme.fill}>
        <Input
          onChangeText={onNameChange}
          editable={isEditMode}
          value={workout?.title ?? ''}
          placeholder="Workout title"
        />
        <Text>Exercises: </Text>
        <View style={lightTheme.fill}>
          <ScrollView contentContainerStyle={styles.list}>
            {isEditMode ? (
              exercises.map(exercise => (
                <TouchableOpacity
                  key={exercise.id}
                  onPress={() => toggleSelected(exercise.id)}>
                  <Row style={styles.exerciseRow} spaceBetween>
                    <Text>{exercise.name}</Text>
                    <CheckBox selected={selectedIds.includes(exercise.id)} />
                  </Row>
                </TouchableOpacity>
              ))
            ) : (
              <Column>
                <Row style={styles.exerciseRow} spaceBetween>
                  <Text style={[lightTheme.fill]} strong>
                    Name
                  </Text>
                  <Text style={[lightTheme.fill, styles.centeredText]} strong>
                    Category
                  </Text>
                  <Text style={[lightTheme.fill, styles.rightText]} strong>
                    Weight
                  </Text>
                </Row>
                {workout.exercises.map(exercise => (
                  <Row
                    key={exercise.id}
                    style={styles.exerciseRow}
                    spaceBetween>
                    <Text style={[lightTheme.fill]}>{exercise.name}</Text>
                    <Text style={[lightTheme.fill, styles.centeredText]}>
                      {exercise.category}
                    </Text>
                    <Text style={[lightTheme.fill, styles.rightText]}>
                      {exercise.weight}
                    </Text>
                  </Row>
                ))}
              </Column>
            )}
          </ScrollView>
        </View>
      </Card>
      {isEditMode ? (
        <Row spaceBetween>
          <Button onPress={disableEdit} text="Cancel" />
          <Button onPress={onSubmit} text="Submit" />
        </Row>
      ) : (
        <Button onPress={enableEdit} text="Edit" />
      )}
    </View>
  );
};

export default WorkoutDetailsScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: Spacing.base,
  },

  list: {
    flexGrow: 1,
  },
  exerciseRow: {
    paddingVertical: Spacing.base,
  },
  centeredText: {
    textAlign: 'center',
  },
  rightText: {
    textAlign: 'right',
  },
});
