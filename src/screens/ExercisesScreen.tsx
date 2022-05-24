import React, {useState, useEffect} from 'react';
import {FlatList, Pressable, ScrollView, StyleSheet, View} from 'react-native';
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
  NumericSelector,
  Divider,
  ExerciseDataInput,
} from '../components';
import {useSelector} from 'react-redux';
import {
  addExercise,
  removeExercise,
  workoutSelector,
} from '../store/slices/workoutSlice';
import {useDispatch} from 'react-redux';

import {Spacing} from '../theme';

const initialValue: Exercise = {
  sets: 4,
  weight: 20,
  category: '',
  reps: [12, 10, 8, 12],
  __typename: 'Exercise',
  id: '',
  name: '',
  createdAt: '',
  updatedAt: '',
};
const AddExerciseModal = ({modalVisible, setModalVisible, onSubmit}) => {
  const [exercise, setExercise] = useState<Exercise>(initialValue);

  async function addExercise() {
    try {
      const newItem: Exercise = {
        ...exercise,
        id: Date.now().toString(),
      };
      onSubmit(newItem);
      resetValues();
    } catch (e) {}
  }
  function resetValues() {
    setExercise(initialValue);
  }
  const onNameChange = (text: string) => {
    const updated = {...exercise, name: text};
    setExercise(updated);
  };
  const onCategoryChange = (text: string) => {
    const updated = {...exercise, category: text};
    setExercise(updated);
  };

  const onSetModalVisible = (isVisible: boolean) => {
    if (!isVisible) {
      resetValues();
    }
    setModalVisible(isVisible);
  };

  return (
    <AppModal modalVisible={modalVisible} setModalVisible={onSetModalVisible}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={{flex: 1}}>
        <ScrollView>
          <Input onChangeText={onNameChange} label="Name" />
          <Input onChangeText={onCategoryChange} label="Category" />
          <ExerciseDataInput exercise={exercise} onUpdate={setExercise} />
        </ScrollView>

        <Button text="Save Exercise" onPress={addExercise} />
      </View>
      {/* </TouchableWithoutFeedback> */}
    </AppModal>
  );
};
const NumericGroupSelector = ({
  values,
  onValueChange,
}: {
  values: number[];
  onValueChange: (newValue: number, index: number) => void;
}) => {
  return (
    <Column>
      {values.map((element, index) => (
        <Row spaceBetween key={index} style={styles.repsRow}>
          <Text>Set {index}</Text>
          <NumericSelector
            onChange={newValue => onValueChange(newValue, index)}
            value={element}
          />
        </Row>
      ))}
    </Column>
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
  repsRow: {
    margin: Spacing.small,
  },
});

export default ExerciseScreen;
