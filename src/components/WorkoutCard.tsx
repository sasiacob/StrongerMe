import {StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Exercise} from '../API';
import {Workout} from '../API';

interface IWorkoutCard {
  item: Workout;
}
const WorkoutCard = ({item}: IWorkoutCard) => {
  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.exerciseHeading}>{item.title}</Text>
      <Text>{item.id}</Text>
      <View>
        {item.exercises?.map(exercise => (
          <View style={{padding: 5, borderWidth: 1}} key={exercise.name}>
            <Text>{exercise.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default WorkoutCard;
const styles = StyleSheet.create({
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
});