import {StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Exercise, WorkoutLog} from '../API';
import {Workout} from '../API';

interface IWorkoutLogCard {
  item: WorkoutLog;
}
const WorkoutLogCard = ({item}: IWorkoutLogCard) => {
  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseHeading}>
        {new Date(parseInt(item.id)).toLocaleString()}
      </Text>
      <View
        style={{
          padding: 5,
          justifyContent: 'space-around',
          flexDirection: 'row',
        }}>
        <Text>Exercise</Text>
        <Text>Weight</Text>
      </View>
      <View>
        {item.exercises?.map(exercise => (
          <View
            key={exercise.id}
            style={{
              padding: 5,
              justifyContent: 'space-around',
              flexDirection: 'row',
            }}>
            <Text>{exercise.name}</Text>
            <Text>{exercise.weight}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default WorkoutLogCard;
const styles = StyleSheet.create({
  exerciseContainer: {
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
});
