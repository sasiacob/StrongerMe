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
import {API, graphqlOperation} from 'aws-amplify';
import {listExercises} from '../graphql/queries';
import {createExercise} from '../graphql/mutations';
import {CreateExerciseInput, DeleteExerciseInput, Exercise} from '../API';
import {deleteExercise} from '../graphql/mutations';
import {captureRejections} from 'events';
import {EXERCISE_DETAILS_SCREEN} from '../navigation/screenNames';
const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>My Exercise List</Text>
  </View>
);

const AddExerciseModal = ({modalVisible, setModalVisible}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sets, setSets] = useState(0);
  const [weight, setWeight] = useState(0);
  async function addExercise() {
    try {
      let input: CreateExerciseInput = {
        name: name,
        weight: weight,
        reps: [8, 10, 12],
        sets: sets,
        category: category,
        description: description,
      };

      const result = await API.graphql(
        graphqlOperation(createExercise, {input: input}),
      );
      console.log('result', result);
      resetValues();
      setModalVisible(false);
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
  const [exercises, setExercises] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    fetchData();
    return function cleanup() {};
  }, []);
  async function fetchData() {
    try {
      const result = await API.graphql(graphqlOperation(listExercises));
      setExercises(result.data.listExercises.items);
      console.log(result);
    } catch (e) {
      console.warn(e);
    }
  }
  async function deleteExerciseee(exercise: Exercise) {
    try {
      const input: DeleteExerciseInput = {
        id: exercise.id,
      };
      console.log('exercise.id', exercise.id);
      const result = await API.graphql(
        graphqlOperation(deleteExercise, {input}),
      );
      console.log('result', result);
    } catch (e) {
      console.log('delete error', e);
    }
  }

  const renderItem = ({item}: {item: Exercise}) => {
    return (
      <Pressable
        onLongPress={() => {
          deleteExerciseee(item);
        }}
        onPress={() => navigation.navigate(EXERCISE_DETAILS_SCREEN)}
        style={styles.exerciseContainer}>
        <Text>
          <Text style={styles.exerciseHeading}>{item.name}</Text>
          {`\n${item.description}`}
          {`\n${item.sets}`}
          {`\n${item.weight}`}
          {`\n${item.category}`}
        </Text>
        {/* <Text
        style={[styles.checkbox, item.isComplete && styles.completedCheckbox]}>
        {item.isComplete ? '✓' : ''}cd
      </Text> */}
      </Pressable>
    );
  };

  return (
    <FlatList
      data={exercises}
      keyExtractor={({id}) => id}
      renderItem={renderItem}
    />
  );
};

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
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
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#4696ec',
    borderWidth: 1,
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 16,
    textAlign: 'center',
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

export default Home;
