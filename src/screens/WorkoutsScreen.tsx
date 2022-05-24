import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
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
import {
  WorkoutCard,
  AppModal,
  Container,
  ScreenHeader,
  Center,
  Button,
  Column,
  Row,
  CheckBox,
} from '../components';
import {Text, Input} from '../components';
import {lightTheme, Spacing} from '../theme';
const AddWorkoutModal = ({modalVisible, setModalVisible, onAddSubmit}) => {
  const [name, setName] = useState('');
  const {exercises} = useSelector(workoutSelector);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  async function addWorkout() {
    try {
      const selectedExercises = exercises.filter(item =>
        selectedIds.includes(item.id),
      );
      const newItem: Workout = {
        __typename: 'Workout',
        id: Date.now().toString(),
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

    setSelectedIds([]);
  }

  const toggleSelected = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(c => c.filter(i => i != id));
    } else {
      setSelectedIds(c => [...c, id]);
    }
  };

  return (
    <AppModal setModalVisible={setModalVisible} modalVisible={modalVisible}>
      <Input onChangeText={setName} placeholder="Workout title" />

      <Text>Exercises: </Text>
      <View style={{height: 200}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {exercises.map((exercise, index) => (
            <TouchableOpacity
              key={exercise.id}
              onPress={() => toggleSelected(exercise.id)}>
              <Row style={styles.exerciseRow} spaceBetween>
                <Text>{exercise.name}</Text>
                <CheckBox selected={selectedIds.includes(exercise.id)} />
              </Row>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Pressable onPress={addWorkout} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Save Workout</Text>
      </Pressable>
    </AppModal>
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
      ListHeaderComponent={<ScreenHeader text="Workouts" />}
      data={workouts}
      keyExtractor={({id}) => id}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={
        <Center fill>
          <Text>No Workouts</Text>
        </Center>
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
    <Container fill>
      <Column style={lightTheme.fill}>
        <WorkoutList />
        <Button
          onPress={() => {
            setModalVisible(true);
          }}
          containerStyle={styles.floatingButton}
          text="+ Add Workout"
        />
        <AddWorkoutModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onAddSubmit={onAddSubmit}
        />
      </Column>
    </Container>
  );
};

export default WorkoutsScreen;

const styles = StyleSheet.create({
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

  listContainer: {
    padding: Spacing.base,
    flexGrow: 1,
  },
  exerciseRow: {
    paddingVertical: Spacing.base,
  },
});
