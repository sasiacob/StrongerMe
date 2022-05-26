import React from 'react';
import {FlatList, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Exercise} from '../API';
import {
  ADD_EXERCISE_SCREEN,
  EXERCISE_DETAILS_SCREEN,
} from '../navigation/screenNames';
import {
  Button,
  Center,
  Column,
  Container,
  ExerciseCard,
  Text,
  ScreenHeader,
} from '../components';
import {useSelector} from 'react-redux';
import {removeExercise, workoutSelector} from '../store/slices/workoutSlice';
import {useDispatch} from 'react-redux';

import {lightTheme, Spacing} from '../theme';

const ExerciseList = () => {
  const {exercises} = useSelector(workoutSelector);
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
  const navigation = useNavigation();
  const enableModal = () => {
    //setModalVisible(true);
    navigation.navigate(ADD_EXERCISE_SCREEN);
  };

  return (
    <Container fill>
      <Column style={lightTheme.fill}>
        <ExerciseList />
        <Button
          onPress={enableModal}
          containerStyle={styles.floatingButton}
          text="+ Add Exercise"
        />
      </Column>
    </Container>
  );
};

const styles = StyleSheet.create({
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
