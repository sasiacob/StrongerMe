import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Exercise, WorkoutLog} from '../API';
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
} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {fontSize, lightTheme, Spacing} from '../theme';

const AddWorkoutLogModal = ({modalVisible, setModalVisible, onAddSubmit}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sets, setSets] = useState(0);
  const [weight, setWeight] = useState(0);
  const [isFirstPhase, setIsFirstPhase] = useState(true);
  const {exercises, workouts} = useSelector(workoutSelector);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [selectedWorkoutsIndexes, setSelectedWorkoutsIndexes] = useState<
    number[]
  >([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  async function addWorkoutLog() {
    try {
      const newItem: WorkoutLog = {
        id: Date.now().toString(),
        exercises: [...selectedExercises],
        timstamp: Date.now(),
      };
      onAddSubmit(newItem);
      resetValues();
    } catch (e) {}
  }
  function resetValues() {
    setName('');
    setWeight(0);
    setCategory('');
    setDescription('');
    setSets(0);
    setSelectedIndexes([]);
    setSelectedWorkoutsIndexes([]);
    setSelectedExercises([]);
    setIsFirstPhase(true);
  }
  function closeModal() {
    setModalVisible(false);
  }
  const toggleSelected = (index: number) => {
    if (selectedIndexes.includes(index)) {
      setSelectedIndexes(c => c.filter(i => i != index));
    } else {
      setSelectedIndexes(c => [...c, index]);
    }
  };
  const toggleSelectedWorkout = (index: number) => {
    if (selectedWorkoutsIndexes.includes(index)) {
      setSelectedWorkoutsIndexes(c => c.filter(i => i != index));
    } else {
      setSelectedWorkoutsIndexes(c => [...c, index]);
    }
  };
  const handleModalClose = (isVisible: boolean) => {
    if (!isVisible) {
      resetValues();
    }
    setModalVisible(isVisible);
  };

  const onNextPress = () => {
    if (selectedIndexes.length == 0) return;
    const filteredExercises = exercises.filter((element, index) =>
      selectedIndexes.includes(index),
    );

    setSelectedExercises(filteredExercises);
    setIsFirstPhase(false);
  };
  const onBackPress = () => {
    setIsFirstPhase(true);
  };
  const onWeightChange = (value: string, id: string) => {
    let newValue = parseInt(value);
    if (isNaN(newValue)) {
      newValue = null;
    }

    const newArray = selectedExercises.map(element => {
      if (element.id == id) {
        return {...element, weight: newValue};
      }
      return element;
    });
    setSelectedExercises(newArray);
  };
  const onRepsChange = (value: string, id: string) => {
    let newValue = parseInt(value);
    if (isNaN(newValue)) {
      newValue = null;
    }
    const newArray = selectedExercises.map(element => {
      if (element.id == id) {
        return {...element, reps: [newValue]};
      }
      return element;
    });
    setSelectedExercises(newArray);
  };
  const onSetsChange = (value: string, id: string) => {
    let newValue = parseInt(value);
    if (isNaN(newValue)) {
      newValue = null;
    }
    const newArray = selectedExercises.map(element => {
      if (element.id == id) {
        return {...element, sets: newValue};
      }
      return element;
    });
    setSelectedExercises(newArray);
  };
  const FirstPhase = () => (
    <Column style={styles.modalWrapper}>
      <Input
        value={name}
        onChangeText={setName}
        placeholder="WorkoutLog title"
      />
      <Input
        value={description}
        onChangeText={setDescription}
        placeholder="WorkoutLog description"
      />
      <View style={styles.spacing} />
      {workouts?.length > 0 && (
        <Card>
          <Text>Workout: </Text>
          <Container transparent style={{height: 150}}>
            <ScrollView contentContainerStyle={styles.listContainer}>
              {workouts.map((workout, index) => (
                <Pressable
                  key={workout.id}
                  onPress={() => toggleSelectedWorkout(index)}>
                  <Container transparent style={styles.padded}>
                    <Row spaceBetween>
                      <Text>{workout.title}</Text>
                      <CheckBox
                        selected={selectedWorkoutsIndexes.includes(index)}
                      />
                    </Row>
                  </Container>
                </Pressable>
              ))}
            </ScrollView>
          </Container>
        </Card>
      )}
      <View style={styles.spacing} />
      <Card>
        <Text>Exercises: </Text>
        <Container transparent style={{height: 150}}>
          <ScrollView contentContainerStyle={styles.listContainer}>
            {exercises.map((exercise, index) => (
              <Pressable
                key={exercise.id}
                onPress={() => toggleSelected(index)}>
                <Container transparent style={styles.padded}>
                  <Row spaceBetween>
                    <Text>{exercise.name}</Text>
                    <CheckBox selected={selectedIndexes.includes(index)} />
                  </Row>
                </Container>
              </Pressable>
            ))}
          </ScrollView>
        </Container>
      </Card>
      <View style={styles.spacing} />
      <Button
        disabled={selectedIndexes.length == 0}
        onPress={onNextPress}
        text={'Next'}
      />
    </Column>
  );
  const SecondPhase = () => (
    <Column style={styles.modalWrapper}>
      <Container transparent>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {selectedExercises.map(element => (
            <Column key={element.id}>
              <Text>{element.name}</Text>
              <Row spaceBetween>
                <Card style={styles.exercisePropsContainer}>
                  <Text style={styles.exercisePropsText}>Weight:</Text>
                  <Input
                    onChangeText={value => {
                      onWeightChange(value, element.id);
                    }}
                    placeholder="Weight"
                    keyboardType="numeric"
                    value={element.weight?.toString() ?? ''}
                  />
                </Card>
                <Card style={styles.exercisePropsContainer}>
                  <Text style={styles.exercisePropsText}>Sets:</Text>
                  <Input
                    onChangeText={value => {
                      onSetsChange(value, element.id);
                    }}
                    placeholder="Sets"
                    keyboardType="numeric"
                    value={element.sets?.toString() ?? ''}
                  />
                </Card>
                <Card style={styles.exercisePropsContainer}>
                  <Text style={styles.exercisePropsText}>Reps:</Text>
                  <Input
                    onChangeText={value => {
                      onRepsChange(value, element.id);
                    }}
                    placeholder="Reps"
                    keyboardType="numeric"
                    value={element.reps?.toString() ?? ''}
                  />
                </Card>
              </Row>
            </Column>
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {isFirstPhase ? FirstPhase() : SecondPhase()}
      </TouchableWithoutFeedback>
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
  },
  floatingButton: {
    position: 'absolute',
    bottom: 44,
  },
  exercisePropsText: {
    color: '#00f',
    fontSize: fontSize.small,
    padding: Spacing.small,
  },
  exercisePropsContainer: {
    margin: 10,
    alignItems: 'center',
    flex: 1,
  },
  listContainer: {
    padding: Spacing.base,
    flexGrow: 1,
  },

  spacing: {
    marginVertical: Spacing.base,
  },
  modalWrapper: {
    height: '80%',
  },
  padded: {
    paddingVertical: Spacing.base,
  },
});
