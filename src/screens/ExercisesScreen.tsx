import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Exercise} from '../API';
import {EXERCISE_DETAILS_SCREEN} from '../navigation/screenNames';
import {
  Button,
  Center,
  Column,
  Container,
  ExerciseCard,
  Input,
  Text,
  AppModal,
  ScreenHeader,
  Row,
} from '../components';
import {useSelector} from 'react-redux';
import {
  addExercise,
  removeExercise,
  workoutSelector,
} from '../store/slices/workoutSlice';
import {useDispatch} from 'react-redux';

import {lightTheme, Spacing} from '../theme';

const initialValues = {
  sets: 4,
  weight: 20,
  reps: [12, 10, 8, 12],
};
const AddExerciseModal = ({modalVisible, setModalVisible, onSubmit}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [sets, setSets] = useState(initialValues.sets);
  const [weight, setWeight] = useState(initialValues.weight);
  const [reps, setReps] = useState<number[]>(initialValues.reps);
  useEffect(() => {
    if (sets == null) return;
    if (reps.length > sets) {
      setReps(c => c.slice(0, sets));
    } else if (reps.length < sets) {
      const difference = sets - reps.length;
      const newArray: number[] = Array(difference).fill(10);
      setReps(c => [...c, ...newArray]);
    }
  }, [sets]);

  async function addExercise() {
    try {
      const newItem: Exercise = {
        name: name,
        description: description,
        category: category,
        sets: sets,
        reps: [...reps],
        weight: weight,
        __typename: 'Exercise',
        id: Date.now().toString(),
        createdAt: '',
        updatedAt: '',
      };
      onSubmit(newItem);
      resetValues();
    } catch (e) {}
  }
  function resetValues() {
    setName('');
    setWeight(initialValues.weight);
    setCategory('');
    setDescription('');
    setSets(initialValues.sets);
    setReps(initialValues.reps);
  }
  const onSetsChange = (text: string) => {
    const value = validNumber(text);
    if (value == null) {
      setSets(null);
    }
    if (value >= 1 && value < 7) {
      setSets(value);
    }
  };

  const onRepsChange = (text: string, index) => {
    const value = validNumber(text);

    const newArray = reps.map((element, i) => {
      if (index == i) {
        return value;
      } else return element;
    });
    setReps(newArray);
  };

  const onWeightChange = (text: string) => {
    const value = validNumber(text);
    if (value == null) {
      return setWeight(null);
    }

    setWeight(value);
  };

  const validNumber = (text: string) => {
    const value = parseInt(text);
    if (isNaN(value)) {
      return null;
    } else return value;
  };
  const onSetModalVisible = (isVisible: boolean) => {
    if (!isVisible) {
      resetValues();
    }
    setModalVisible(isVisible);
  };

  return (
    <AppModal modalVisible={modalVisible} setModalVisible={onSetModalVisible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Input onChangeText={setName} label="Name" />
          <Input onChangeText={setCategory} label="Category" />
          <Input
            onChangeText={onWeightChange}
            label="Weight"
            value={weight?.toString() ?? ''}
            keyboardType={'numeric'}
          />
          <Input
            onChangeText={onSetsChange}
            value={sets?.toString() ?? ''}
            label="Sets"
            keyboardType={'numeric'}
          />
          <Row>
            {reps.map((element, index) => (
              <Input
                onChangeText={text => onRepsChange(text, index)}
                label="Reps"
                keyboardType={'numeric'}
                value={element?.toString() ?? ''}
              />
            ))}
          </Row>

          <Button text="Save Exercise" onPress={addExercise} />
        </View>
      </TouchableWithoutFeedback>
    </AppModal>
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
    } catch (e) {}
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
      contentContainerStyle={styles.listContainer}
      ListHeaderComponent={<ScreenHeader text="My Exercises" />}
      ListEmptyComponent={
        <Container fill>
          <Center fill>
            <Text>No excercises</Text>
          </Center>
        </Container>
      }
      keyExtractor={({id}) => id}
      renderItem={renderItem}
    />
  );
};

const ExerciseScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();

  const enableModal = () => {
    setModalVisible(true);
  };
  const disableModal = () => {
    setModalVisible(false);
  };
  const onAddSubmit = (exercise: Exercise) => {
    dispatch(addExercise(exercise));
    setModalVisible(false);
  };
  return (
    <Container fill>
      <Column style={{flex: 1}}>
        <ExerciseList />
        <Button
          onPress={enableModal}
          containerStyle={styles.floatingButton}
          text="+ Add Exercise"
        />

        <AddExerciseModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onSubmit={onAddSubmit}
        />
      </Column>
    </Container>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: Spacing.triple,
  },

  floatingButton: {
    position: 'absolute',
    bottom: 44,
  },

  listContainer: {
    padding: Spacing.base,
    flexGrow: 1,
  },
});

export default ExerciseScreen;
