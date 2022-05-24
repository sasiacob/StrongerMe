import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Exercise, Workout, WorkoutLog} from '../API';
import {LOGS_DETAILS_SCREEN} from '../navigation/screenNames';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  addWorkoutLog,
  removeWorkoutLog,
  workoutSelector,
} from '../store/slices/workoutSlice';
import {useDispatch} from 'react-redux';
import {
  AppModal,
  Center,
  WorkoutLogCard,
  Text,
  Input,
  Container,
  Column,
  Button,
  Row,
  CheckBox,
  Card,
  ScreenHeader,
  ExerciseDataInput,
} from '../components';
import {lightTheme, Spacing} from '../theme';

interface SelectableWorkout extends Workout {
  isSelected?: boolean;
}
interface SelectableExercise extends Exercise {
  isSelected?: boolean;
}

const AddWorkoutLogModal = ({modalVisible, setModalVisible, onAddSubmit}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isFirstPhase, setIsFirstPhase] = useState(true);

  const {exercises, workouts} = useSelector(workoutSelector);
  const [selectableWorkouts, setSelectableWorkouts] =
    useState<SelectableWorkout[]>(workouts);
  const [selectableExercises, setSelectableExercises] =
    useState<SelectableExercise[]>(exercises);

  async function addWorkoutLog() {
    try {
      const newItem: WorkoutLog = {
        id: Date.now().toString(),
        exercises: [...filteredExercises()],
        timstamp: Date.now(),
      };
      onAddSubmit(newItem);
      resetValues();
    } catch (e) {}
  }
  function resetValues() {
    setName('');
    setDescription('');
    setSelectableExercises(exercises);
    setSelectableWorkouts(workouts);
    setIsFirstPhase(true);
  }

  const filteredExercises = () =>
    selectableExercises.filter(el => el.isSelected);

  const onToggleExercise = (id: string) => {
    const updatedArray = selectableExercises.map(element => {
      if (element.id == id) {
        if (element.isSelected == true) return {...element, isSelected: false};
        else {
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
      if (element.id == id) {
        exercisesIds = element.exercises.map(el => el.id);
        if (element.isSelected == true) return {...element, isSelected: false};
        else {
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

  const handleModalClose = (isVisible: boolean) => {
    if (!isVisible) {
      resetValues();
    }
    setModalVisible(isVisible);
  };

  const onNextPress = () => {
    setIsFirstPhase(false);
  };

  const onBackPress = () => {
    setIsFirstPhase(true);
  };

  const onExerciseUpdate = (updatedItem: Exercise) => {
    const updatedArr: SelectableExercise[] = filteredExercises().map(el => {
      if (el.id == updatedItem.id) {
        return {...updatedItem, isSelected: true};
      }
      return el;
    });
    setSelectableExercises(updatedArr);
  };

  const FirstPhase = () => (
    <Column style={{flex: 1}}>
      <Input
        value={name}
        onChangeText={setName}
        placeholder="WorkoutLog title"
      />

      <View style={styles.spacing} />
      {workouts?.length > 0 && (
        <Card style={{minHeight: 150, maxHeight: '40%'}}>
          <Text>Workout: </Text>

          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={styles.listContainer}>
            {selectableWorkouts.map((workout, index) => (
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
      <Card style={{minHeight: 150, maxHeight: '40%'}}>
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
        disabled={filteredExercises().length == 0}
        onPress={onNextPress}
        text={'Next'}
      />
    </Column>
  );
  const SecondPhase = () => (
    <Column style={{flex: 1}}>
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
        <Button text="Save" onPress={addWorkoutLog} />
      </Row>
    </Column>
  );
  return (
    <AppModal setModalVisible={handleModalClose} modalVisible={modalVisible}>
      {isFirstPhase ? FirstPhase() : SecondPhase()}
    </AppModal>
  );
};

const WorkoutLogList = () => {
  const {workoutLogs} = useSelector(workoutSelector);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  async function deleteWorkoutLog(workoutLog: WorkoutLog) {
    try {
      dispatch(removeWorkoutLog(workoutLog.id));
    } catch (e) {}
  }

  const renderItem = ({item}: {item: WorkoutLog}) => {
    return (
      <Pressable
        onLongPress={() => {
          deleteWorkoutLog(item);
        }}
        onPress={() =>
          navigation.navigate(LOGS_DETAILS_SCREEN, {exercise: item})
        }>
        <WorkoutLogCard item={item} />
      </Pressable>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={<ScreenHeader text="Workout Logs" />}
      data={workoutLogs}
      keyExtractor={({id}) => id}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={
        <Center>
          <Text>No workouts logs</Text>
        </Center>
      }
      renderItem={renderItem}
    />
  );
};
const WorkoutLogsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const onAddSubmit = (workoutLog: WorkoutLog) => {
    setModalVisible(false);
    dispatch(addWorkoutLog(workoutLog));
  };
  return (
    <Container fill>
      <Column style={lightTheme.fill}>
        <WorkoutLogList />
        <Button
          onPress={() => {
            setModalVisible(true);
          }}
          containerStyle={styles.floatingButton}
          text="+ Add Workout Log"
        />

        <AddWorkoutLogModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onAddSubmit={onAddSubmit}
        />
      </Column>
    </Container>
  );
};

export default WorkoutLogsScreen;

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
});
