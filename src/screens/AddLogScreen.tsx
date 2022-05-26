import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Exercise, Workout, WorkoutLog} from '../API';
import {useSelector} from 'react-redux';
import {addWorkoutLog, workoutSelector} from '../store/slices/workoutSlice';
import {useDispatch} from 'react-redux';
import {
  Text,
  Input,
  Container,
  Column,
  Button,
  Row,
  CheckBox,
  Card,
  ExerciseDataInput,
} from '../components';
import {lightTheme, Spacing} from '../theme';

interface SelectableWorkout extends Workout {
  isSelected?: boolean;
}
interface SelectableExercise extends Exercise {
  isSelected?: boolean;
}
const AddLogScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [isFirstPhase, setIsFirstPhase] = useState(true);

  const {exercises, workouts} = useSelector(workoutSelector);
  const [selectableWorkouts, setSelectableWorkouts] =
    useState<SelectableWorkout[]>(workouts);
  const [selectableExercises, setSelectableExercises] =
    useState<SelectableExercise[]>(exercises);
  const dispatch = useDispatch();

  async function onSubmit() {
    try {
      const newItem: WorkoutLog = {
        id: Date.now().toString(),
        exercises: [...filteredExercises()],
        timstamp: Date.now(),
      };
      dispatch(addWorkoutLog(newItem));
      navigation.pop();
      resetValues();
    } catch (e) {}
  }
  function resetValues() {
    setName('');

    setSelectableExercises(exercises);
    setSelectableWorkouts(workouts);
    setIsFirstPhase(true);
  }

  const filteredExercises = () =>
    selectableExercises.filter(el => el.isSelected);

  const onToggleExercise = (id: string) => {
    const updatedArray = selectableExercises.map(element => {
      if (element.id === id) {
        if (element.isSelected === true) {
          return {...element, isSelected: false};
        } else {
          return {...element, isSelected: true};
        }
      }
      return element;
    });
    setSelectableExercises(updatedArray);
  };
  const onToggleWorkout = (id: string) => {
    let exercisesIds: string[];
    const updatedArray = selectableWorkouts.map(element => {
      if (element.id === id) {
        exercisesIds = element.exercises.map(el => el.id);
        if (element.isSelected === true) {
          return {...element, isSelected: false};
        } else {
          return {...element, isSelected: true};
        }
      }
      return element;
    });
    const updatedExArray = selectableExercises.map(element => {
      if (exercisesIds.includes(element.id)) {
        return {...element, isSelected: true};
      }
      return {...element, isSelected: false};
    });
    setSelectableExercises(updatedExArray);
    setSelectableWorkouts(updatedArray);
  };

  const onNextPress = () => {
    setIsFirstPhase(false);
  };

  const onBackPress = () => {
    setIsFirstPhase(true);
  };

  const onExerciseUpdate = (updatedItem: Exercise) => {
    const updatedArr: SelectableExercise[] = filteredExercises().map(el => {
      if (el.id === updatedItem.id) {
        return {...updatedItem, isSelected: true};
      }
      return el;
    });
    setSelectableExercises(updatedArr);
  };

  const FirstPhase = () => (
    <Column style={lightTheme.fill}>
      <Input
        value={name}
        onChangeText={setName}
        placeholder="WorkoutLog title"
      />

      <View style={styles.spacing} />
      {workouts?.length > 0 && (
        <Card style={styles.card}>
          <Text>Workout: </Text>

          <ScrollView
            style={lightTheme.fill}
            contentContainerStyle={styles.listContainer}>
            {selectableWorkouts.map(workout => (
              <TouchableOpacity
                key={workout.id}
                onPress={() => onToggleWorkout(workout.id)}>
                <Container transparent style={styles.padded}>
                  <Row spaceBetween>
                    <Text>{workout.title}</Text>
                    <CheckBox selected={workout.isSelected} />
                  </Row>
                </Container>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Card>
      )}
      <View style={styles.spacing} />
      <Card style={styles.card}>
        <Text>Exercises: </Text>

        <ScrollView contentContainerStyle={styles.listContainer}>
          {selectableExercises.map(exercise => (
            <TouchableOpacity
              key={exercise.id}
              onPress={() => onToggleExercise(exercise.id)}>
              <Container transparent style={styles.padded}>
                <Row spaceBetween>
                  <Text>{exercise.name}</Text>
                  <CheckBox selected={exercise.isSelected} />
                </Row>
              </Container>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Card>
      <View style={styles.spacing} />
      <Button
        disabled={filteredExercises().length === 0}
        onPress={onNextPress}
        text={'Next'}
      />
    </Column>
  );
  const SecondPhase = () => (
    <Column style={lightTheme.fill}>
      <Container fill transparent>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {filteredExercises().map(exercise => (
            <Card key={exercise.id}>
              <Text strong>{exercise.name}</Text>
              <ExerciseDataInput
                exercise={exercise}
                onUpdate={onExerciseUpdate}
              />
            </Card>
          ))}
        </ScrollView>
      </Container>

      <Row style={styles.buttonsContainer}>
        <Button text="Back" onPress={onBackPress} />
        <Button text="Save" onPress={onSubmit} />
      </Row>
    </Column>
  );
  return (
    <View style={{flex: 1, padding: Spacing.base}}>
      {isFirstPhase ? FirstPhase() : SecondPhase()}
    </View>
  );
};

export default AddLogScreen;

const styles = StyleSheet.create({
  buttonsContainer: {
    justifyContent: 'space-around',
    marginTop: Spacing.double,
  },

  listContainer: {
    padding: Spacing.base,
    flexGrow: 1,
  },

  spacing: {
    marginVertical: Spacing.base,
  },

  padded: {
    paddingVertical: Spacing.base,
  },
  card: {
    minHeight: 150,
    maxHeight: '40%',
  },
});
