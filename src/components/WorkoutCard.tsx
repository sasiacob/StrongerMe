import {StyleSheet, View} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Exercise} from '../API';
import {Workout} from '../API';
import {Card, Column, Row, Text} from './common';
import {fontSize} from '../theme';
interface IWorkoutCard {
  item: Workout;
}
const WorkoutCard = ({item}: IWorkoutCard) => {
  return (
    <Card>
      <Text style={styles.heading}>{item.title}</Text>
      <Text>{new Date(parseInt(item.id)).toLocaleString()}</Text>
      <Row style={styles.row}>
        <Text style={styles.header}>Exercise Name</Text>
        <Text style={styles.header}>Default Weight</Text>
      </Row>
      <Column>
        {item.exercises?.map(exercise => (
          <Row key={exercise.id} style={styles.row}>
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
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
});
