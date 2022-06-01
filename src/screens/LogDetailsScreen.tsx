import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  Button,
  Card,
  CheckBox,
  Column,
  Container,
  ExerciseDataInput,
  Input,
  Row,
  Text,
} from '../components';
import {Exercise, Workout, WorkoutLog} from '../API';
import {useSelector, useDispatch} from 'react-redux';
import {updateWorkoutLog, workoutSelector} from '../store/slices/workoutSlice';
import {lightTheme, Spacing} from '../theme';
import {useEffect} from 'react';

interface SelectableWorkout extends Workout {
  isSelected?: boolean;
}
interface SelectableExercise extends Exercise {
  isSelected?: boolean;
}
const LogDetailsScreen = ({route, navigation}) => {
  const workoutLog: WorkoutLog = route.params.workoutLog;

  const [name, setName] = useState('');

  const [isFirstPhase, setIsFirstPhase] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const {exercises, workouts} = useSelector(workoutSelector);
  const [selectableWorkouts, setSelectableWorkouts] =
    useState<SelectableWorkout[]>(workouts);
  const [selectableExercises, setSelectableExercises] = useState<
    SelectableExercise[]
  >(workoutLog.exercises);

  const [logTimestamp, setLogTimestamp] = useState<number>(workoutLog.timstamp);
  const [showPicker, setShowPicker] = useState(false);
  useEffect(() => {
    console.log('showPicker', showPicker);
  }, [showPicker]);
  const dispatch = useDispatch();

  async function onSubmit() {
    try {
      const updatedItem = {
        ...workoutLog,
        timstamp: logTimestamp,
        exercises: [...filteredExercises()],
      };
      dispatch(updateWorkoutLog(updatedItem));
      navigation.pop();
      resetValues();
    } catch (e) {
      console.warn(e);
    }
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
    //setIsFirstPhase(true);
    setIsEditMode(false);
  };
  const enableEdit = () => {
    setIsEditMode(true);
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
  const localeDate = (): string => {
    const value = new Date(logTimestamp).toLocaleString();
    return value;
  };
  const onDateChange = (date: Date) => {
    setLogTimestamp(date.getTime());
    setShowPicker(false);
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
        <Card style={styles.workoutCard}>
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
      <Card style={styles.workoutCard}>
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
          <Row spaceBetween>
            <Text>{localeDate()}</Text>

            {isEditMode && (
              <Button text="Edit" onPress={() => setShowPicker(true)} />
            )}
          </Row>

          <DatePicker
            modal
            open={showPicker}
            date={new Date(logTimestamp)}
            onCancel={() => {
              setShowPicker(false);
            }}
            maximumDate={new Date()}
            mode="datetime"
            onConfirm={onDateChange}
          />

          {filteredExercises().map(exercise => (
            <Card key={exercise.id}>
              <Text strong>{exercise.name}</Text>
              <ExerciseDataInput
                editable={isEditMode}
                exercise={exercise}
                onUpdate={onExerciseUpdate}
              />
            </Card>
          ))}
        </ScrollView>
      </Container>

      {!isEditMode ? (
        <Button onPress={enableEdit} text="Edit" />
      ) : (
        <Row style={styles.buttonsContainer}>
          <Button text="Back" onPress={onBackPress} />
          <Button text="Save" onPress={onSubmit} />
        </Row>
      )}
    </Column>
  );
  return (
    <View style={[lightTheme.fill, styles.padded]}>
      {isFirstPhase ? FirstPhase() : SecondPhase()}
    </View>
  );
};

export default LogDetailsScreen;

const styles = StyleSheet.create({
  buttonsContainer: {
    justifyContent: 'space-around',
    marginTop: Spacing.double,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 44,
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
  workoutCard: {
    minHeight: 150,
    maxHeight: '40%',
  },
  exerciseCard: {},
});
