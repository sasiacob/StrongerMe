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
import React, {useState} from 'react';
import {Workout} from '../API';
import {WORKOUT_DETAILS_SCREEN} from '../navigation/screenNames';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  addWorkout,
  removeWorkout,
  workoutSelector,
} from '../store/slices/workoutSlice';
import {useDispatch} from 'react-redux';
import {WorkoutCard} from '../components';
const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>My Workouts</Text>
  </View>
);
const AddWorkoutModal = ({modalVisible, setModalVisible, onAddSubmit}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sets, setSets] = useState(0);
  const [weight, setWeight] = useState(0);
  const {exercises} = useSelector(workoutSelector);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

  async function addWorkout() {
    try {
      const selectedExercises = exercises.filter((item, index) =>
        selectedIndexes.includes(index),
      );

      const newItem: Workout = {
        __typename: 'Workout',
        id: name,
        title: name,
        exercises: selectedExercises,
      };
      onAddSubmit(newItem);
      resetValues();
    } catch (e) {
      console.log('error: ', e);
    }
  }
  function resetValues() {
    setName('');
    setWeight(0);
    setCategory('');
    setDescription('');
    setSets(0);
    setSelectedIndexes([]);
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

  return (
    <Modal
      animationType="fade"
      onRequestClose={closeModal}
      transparent
      visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Pressable onPress={closeModal} style={styles.modalDismissButton}>
            <Text style={styles.modalDismissText}>X</Text>
          </Pressable>
          <TextInput
            onChangeText={setName}
            placeholder="Workout title"
            style={styles.modalInput}
          />
          <TextInput
            onChangeText={setDescription}
            placeholder="Workout description"
            style={styles.modalInput}
          />
          <Text>Exercises: </Text>
          <View style={{height: 200, borderWidth: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1, borderWidth: 1}}>
              {exercises.map((exercise, index) => (
                <Pressable onPress={() => toggleSelected(index)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingVertical: 10,
                      borderWidth: 1,
                    }}>
                    <Text>{exercise.name}</Text>
                    <Text>
                      {selectedIndexes.includes(index)
                        ? 'checked'
                        : 'unchecked'}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <Pressable onPress={addWorkout} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Save Workout</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
const WorkoutList = () => {
  const {workouts} = useSelector(workoutSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  async function deleteWorkout(workout: Workout) {
    try {
      dispatch(removeWorkout(workout.id));
    } catch (e) {
      console.log('delete error', e);
    }
  }

  const renderItem = ({item}: {item: Workout}) => {
    return (
      <Pressable
        onLongPress={() => {
          deleteWorkout(item);
        }}
        onPress={() =>
          navigation.navigate(WORKOUT_DETAILS_SCREEN, {exercise: item})
        }>
        <WorkoutCard item={item} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={workouts}
      keyExtractor={({id}) => id}
      contentContainerStyle={{flexGrow: 1}}
      ListEmptyComponent={
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>No exercises</Text>
        </View>
      }
      renderItem={renderItem}
    />
  );
};
const WorkoutsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const onAddSubmit = (workout: Workout) => {
    dispatch(addWorkout(workout));
    setModalVisible(false);
  };
  return (
    <>
      <Header />
      <WorkoutList />
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={[styles.buttonContainer, styles.floatingButton]}>
        <Text style={styles.buttonText}>+ Add Workout</Text>
      </Pressable>
      <AddWorkoutModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onAddSubmit={onAddSubmit}
      />
    </>
  );
};

export default WorkoutsScreen;

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
  checkbox: {
    borderRadius: 2,
    borderWidth: 2,
    fontWeight: '700',
    height: 20,
    marginLeft: 'auto',
    textAlign: 'center',
    width: 20,
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
});
