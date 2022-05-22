import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Exercise, WorkoutLog} from '../API';
import {
  LOGS_DETAILS_SCREEN,
  WORKOUT_DETAILS_SCREEN,
} from '../navigation/screenNames';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  addWorkoutLog,
  removeWorkoutLog,
  workoutSelector,
} from '../store/slices/workoutSlice';
import {useDispatch} from 'react-redux';
import {AppModal, WorkoutLogCard} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>My WorkoutLogs</Text>
  </View>
);
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
      const selectedExercises = exercises.filter((item, index) =>
        selectedIndexes.includes(index),
      );
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
    <View>
      <TextInput placeholderTextColor={'#000'}
        onChangeText={setName}
        placeholder="WorkoutLog title"
        style={styles.modalInput}
      />
      <TextInput placeholderTextColor={'#000'}
        onChangeText={setDescription}
        placeholder="WorkoutLog description"
        style={styles.modalInput}
      />
      <Text>Workout: </Text>
      <View style={{height: 200}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {workouts.map((workout, index) => (
            <Pressable
              key={workout.id}
              onPress={() => toggleSelectedWorkout(index)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 10,
                }}>
                <Text>{workout.title}</Text>
                <Text>
                  {selectedWorkoutsIndexes.includes(index)
                    ? 'checked'
                    : 'unchecked'}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Text>Exercises: </Text>
      <View style={{height: 200}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {exercises.map((exercise, index) => (
            <Pressable key={exercise.id} onPress={() => toggleSelected(index)}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 10,
                }}>
                <Text>{exercise.name}</Text>
                <Icon
                  size={25}
                  name={
                    selectedIndexes.includes(index)
                      ? 'checkbox-marked-circle'
                      : 'checkbox-blank-circle-outline'
                  }
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Pressable
        disabled={selectedIndexes.length == 0}
        onPress={onNextPress}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
  const SecondPhase = () => (
    <View style={styles.modalInnerContainer}>
      <View style={{height: 300}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {selectedExercises.map(element => (
            <View key={element.id}>
              <Text>{element.name}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={styles.exercisePropsContainer}>
                  <Text style={styles.exercisePropsText}>Weight:</Text>
                  <TextInput placeholderTextColor={'#000'}
                    onChangeText={value => {
                      onWeightChange(value, element.id);
                    }}
                    placeholder="Weight"
                    keyboardType="numeric"
                    value={element.weight?.toString() ?? ''}
                    style={styles.modalInput}
                  />
                </View>
                <View style={styles.exercisePropsContainer}>
                  <Text style={styles.exercisePropsText}>Sets:</Text>
                  <TextInput placeholderTextColor={'#000'}
                    onChangeText={value => {
                      onSetsChange(value, element.id);
                    }}
                    placeholder="Sets"
                    keyboardType="numeric"
                    value={element.sets?.toString() ?? ''}
                    style={styles.modalInput}
                  />
                </View>
                <View style={styles.exercisePropsContainer}>
                  <Text style={styles.exercisePropsText}>Reps:</Text>
                  <TextInput placeholderTextColor={'#000'}
                    onChangeText={value => {
                      onRepsChange(value, element.id);
                    }}
                    placeholder="Reps"
                    keyboardType="numeric"
                    value={element.reps?.toString() ?? ''}
                    style={styles.modalInput}
                  />
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Pressable onPress={onBackPress} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
        <Pressable onPress={addWorkoutLog} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
  return (
    <AppModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
      {isFirstPhase ? <FirstPhase /> : <SecondPhase />}
    </AppModal>
  );
};
const WorkoutLogList = () => {
  const {workoutLogs} = useSelector(workoutSelector);
  console.log('workoutLogs', workoutLogs);
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
      ListHeaderComponent={<Header />}
      data={workoutLogs}
      keyExtractor={({id}) => id}
      contentContainerStyle={{flexGrow: 1}}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>No workouts logs</Text>
        </View>
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
    <>
      <WorkoutLogList />
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={[styles.buttonContainer, styles.floatingButton]}>
        <Text style={styles.buttonText}>+ Add WorkoutLog</Text>
      </Pressable>
      <AddWorkoutLogModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAddSubmit={onAddSubmit}
      />
    </>
  );
};

export default WorkoutLogsScreen;

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
  },
  headerTitle: {
    color: '#3a3a3a',
    fontSize: 30,
    fontWeight: '600',
    paddingVertical: 16,
  },
  exerciseContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 2,
    elevation: 4,

    marginHorizontal: 8,
    marginVertical: 4,
    padding: 8,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  exerciseHeading: {
    fontSize: 20,
    fontWeight: '600',
  },

  completedCheckbox: {
    backgroundColor: '#000',
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    padding: 16,
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#4696ec',
    borderRadius: 99,
    paddingHorizontal: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 44,
    elevation: 6,
    shadowOffset: {
      height: 4,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalInnerContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    padding: 16,
  },
  modalInput: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  modalDismissButton: {
    marginLeft: 'auto',
  },
  modalDismissText: {
    fontSize: 20,
    fontWeight: '700',
  },
  exercisePropsText: {
    color: '#00f',
    fontSize: 12,
    padding: 5,
  },
  exercisePropsContainer: {
    margin: 10,
    // flexDirection: 'row',
    alignItems: 'center',

    flex: 1,

    elevation: 4,
    shadowOffset: {width: 2, height: 3},
    shadowColor: '#aaa',
    shadowOpacity: 0.8,
    backgroundColor: '#fff',
    borderColor: '#79727210',
    borderRadius: 10,
  },
});
