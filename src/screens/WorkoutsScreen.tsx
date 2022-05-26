import {FlatList, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Workout} from '../API';
import {
  ADD_WORKOUTS_SCREEN,
  WORKOUT_DETAILS_SCREEN,
} from '../navigation/screenNames';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {removeWorkout, workoutSelector} from '../store/slices/workoutSlice';
import {useDispatch} from 'react-redux';
import {
  WorkoutCard,
  Container,
  ScreenHeader,
  Center,
  Button,
  Column,
} from '../components';
import {Text} from '../components';
import {lightTheme, Spacing} from '../theme';

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
          navigation.navigate(WORKOUT_DETAILS_SCREEN, {workout: item})
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

const WorkoutsScreen = ({navigation}) => {
  const onAddPress = () => {
    navigation.push(ADD_WORKOUTS_SCREEN);
  };

  return (
    <Container fill>
      <Column style={lightTheme.fill}>
        <WorkoutList />
        <Button
          onPress={onAddPress}
          containerStyle={styles.floatingButton}
          text="+ Add Workout"
        />
      </Column>
    </Container>
  );
};

export default WorkoutsScreen;

const styles = StyleSheet.create({
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
});
