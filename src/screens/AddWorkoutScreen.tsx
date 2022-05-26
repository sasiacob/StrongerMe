import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Workout} from '../API';
import {useSelector} from 'react-redux';
import {addWorkout, workoutSelector} from '../store/slices/workoutSlice';
import {Row, CheckBox, Button, Card} from '../components';
import {Text, Input} from '../components';
import {useDispatch} from 'react-redux';
import {lightTheme, Spacing} from '../theme';
const AddWorkoutScreen = () => {
  const [name, setName] = useState('');
  const {exercises} = useSelector(workoutSelector);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const dispatch = useDispatch();
  async function onSubmit() {
    try {
      const selectedExercises = exercises.filter(item =>
        selectedIds.includes(item.id),
      );
      const newItem: Workout = {
        __typename: 'Workout',
        id: Date.now().toString(),
        title: name,
        exercises: selectedExercises,
      };
      dispatch(addWorkout(newItem));
      resetValues();
    } catch (e) {
      console.log('error: ', e);
    }
  }
  function resetValues() {
    setName('');

    setSelectedIds([]);
  }

  const toggleSelected = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(c => c.filter(i => i !== id));
    } else {
      setSelectedIds(c => [...c, id]);
    }
  };

  return (
    <View style={[lightTheme.fill, styles.wrapper]}>
      <Card style={lightTheme.fill}>
        <Input onChangeText={setName} placeholder="Workout title" />
        <Text>Exercises: </Text>
        <View style={lightTheme.fill}>
          <ScrollView contentContainerStyle={lightTheme.fill}>
            {exercises.map(exercise => (
              <TouchableOpacity
                key={exercise.id}
                onPress={() => toggleSelected(exercise.id)}>
                <Row style={styles.exerciseRow} spaceBetween>
                  <Text>{exercise.name}</Text>
                  <CheckBox selected={selectedIds.includes(exercise.id)} />
                </Row>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Card>

      <Button onPress={onSubmit} text="Save workout" />
    </View>
  );
};

export default AddWorkoutScreen;

const styles = StyleSheet.create({
  listContainer: {
    padding: Spacing.base,
    flexGrow: 1,
  },
  exerciseRow: {
    paddingVertical: Spacing.base,
  },
  wrapper: {
    padding: Spacing.base,
  },
});
