import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Exercise} from '../API';
import {EXERCISE_DETAILS_SCREEN} from '../navigation/screenNames';
import {ExerciseCard} from '../components';
import {useSelector} from 'react-redux';
import {
  addExercise,
  removeExercise,
  workoutSelector,
} from '../store/slices/workoutSlice';
import {useDispatch} from 'react-redux';
const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>My Exercises</Text>
  </View>
);

const AddExerciseModal = ({modalVisible, setModalVisible, onSubmit}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sets, setSets] = useState(0);
  const [weight, setWeight] = useState(0);
  async function addExercise() {
    try {
      const newItem: Exercise = {
        name: name,
        description: description,
        category: category,
        sets: sets,
        weight: weight,
        __typename: 'Exercise',
        id: name + description,
        createdAt: '',
        updatedAt: '',
      };
      onSubmit(newItem);
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
  }
  function closeModal() {
    setModalVisible(false);
  }

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
            placeholder="Name"
            style={styles.modalInput}
          />
          <TextInput
            onChangeText={setCategory}
            placeholder="Category"
            style={styles.modalInput}
          />
          <TextInput
            onChangeText={text => setWeight(parseInt(text))}
            placeholder="Weight"
            style={styles.modalInput}
            keyboardType={'numeric'}
          />
          <TextInput
            onChangeText={text => setSets(parseInt(text))}
            placeholder="Sets"
            style={styles.modalInput}
            keyboardType={'numeric'}
          />

          <Pressable onPress={addExercise} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Save Exercise</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const ExerciseList = () => {
  const {exercises} = useSelector(workoutSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    return function cleanup() {};
  }, []);

  async function deleteExercise(exercise: Exercise) {
    try {
      dispatch(removeExercise(exercise.id));
    } catch (e) {
      console.log('delete error', e);
    }
  }

  const renderItem = ({item}: {item: Exercise}) => {
    return (
      <Pressable
        onLongPress={() => {
          deleteExercise(item);
        }}
        onPress={() =>
          navigation.navigate(EXERCISE_DETAILS_SCREEN, {exercise: item})
        }>
        <ExerciseCard exercise={item} />
      </Pressable>
    );
  };

  return (
    <FlatList
      data={exercises}
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
      keyExtractor={({id}) => id}
      renderItem={renderItem}
    />
  );
};

const ExerciseScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const onAddSubmit = (exercise: Exercise) => {
    console.log('exercise', exercise);
    dispatch(addExercise(exercise));
    setModalVisible(false);
  };
  return (
    <View style={{flex: 1}}>
      <Header />
      <ExerciseList />
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={[styles.buttonContainer, styles.floatingButton]}>
        <Text style={styles.buttonText}>+ Add Exercise</Text>
      </Pressable>

      <AddExerciseModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onSubmit={onAddSubmit}
      />
    </View>
  );
};

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
    flexDirection: 'row',
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

export default ExerciseScreen;
