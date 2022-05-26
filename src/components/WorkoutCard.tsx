import {StyleSheet} from 'react-native';
import React from 'react';
import {Exercise} from '../API';
import {Workout} from '../API';
import {Card, Column, Row, Text} from './common';
import {Colors, fontSize, Spacing} from '../theme';
import {useSelector} from 'react-redux';
import {workoutSelector} from '../store/slices/workoutSlice';
interface IWorkoutCard {
  item: Workout;
}
const WorkoutCard = ({item}: IWorkoutCard) => {
  const {exercises} = useSelector(workoutSelector);
  const filtered = (exercise: Exercise) => {
    const ids = item.exercises.map(el => el.id);
    return ids.includes(exercise.id);
  };
  return (
    <Card>
      <Text style={styles.heading}>{item.title}</Text>

      <Row spaceBetween style={styles.row}>
        <Text style={styles.header}>Exercise Name</Text>
        <Text style={styles.header}>Weight</Text>
      </Row>
      <Column>
        {exercises.filter(filtered).map(exercise => (
          <Row spaceBetween key={exercise.id} style={styles.row}>
            <Text>{exercise.name}</Text>
            <Text>{exercise.weight}</Text>
          </Row>
        ))}
      </Column>
    </Card>
  );
};
export default WorkoutCard;
const styles = StyleSheet.create({
  heading: {
    fontSize: fontSize.xLarge,
  },
  header: {fontWeight: '700'},
  row: {
    paddingVertical: Spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: Colors.onPrimary + Colors.semiTransparent,
    width: '70%',
    alignSelf: 'center',
  },
});
