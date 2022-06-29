import {FlatList, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {WorkoutLog} from '../API';
import {ADD_LOGS_SCREEN, LOG_DETAILS_SCREEN} from '../navigation/screenNames';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {removeWorkoutLog, workoutSelector} from '../store/slices/workoutSlice';
import {useDispatch} from 'react-redux';
import {
  Center,
  WorkoutLogCard,
  Text,
  Container,
  Column,
  Button,
  ScreenHeader,
} from '../components';
import {lightTheme, Spacing} from '../theme';

const WorkoutLogList = () => {
  const {workoutLogs} = useSelector(workoutSelector);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  async function deleteWorkoutLog(workoutLog: WorkoutLog) {
    try {
      dispatch(removeWorkoutLog(workoutLog.id));
    } catch (e) {
      console.warn(e);
    }
  }

  const renderItem = ({item}: {item: WorkoutLog}) => {
    return (
      <Pressable
        onLongPress={() => {
          deleteWorkoutLog(item);
        }}
        onPress={() =>
          navigation.navigate(LOG_DETAILS_SCREEN, {workoutLog: item})
        }>
        <WorkoutLogCard item={item} />
      </Pressable>
    );
  };

  return (
    <FlatList
      ListHeaderComponent={<ScreenHeader text="Workout Logs" />}
      data={workoutLogs.sort((a, b) => (a.timstamp < b.timstamp ? 1 : -1))}
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
const WorkoutLogsScreen = ({navigation}) => {
  const onAddPress = () => {
    navigation.navigate(ADD_LOGS_SCREEN);
  };
  return (
    <Container fill>
      <Column style={lightTheme.fill}>
        <WorkoutLogList />

        <Button
          onPress={onAddPress}
          containerStyle={styles.floatingButton}
          text="+ Add Workout Log"
        />
      </Column>
    </Container>
  );
};

export default WorkoutLogsScreen;

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 44,
  },

  listContainer: {
    padding: Spacing.base,
    flexGrow: 1,
  },

  spacing: {
    marginVertical: Spacing.base,
  },
});
