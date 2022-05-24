import {StyleSheet, View} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Exercise} from '../API';
import {Workout} from '../API';
import {Card, Column, Row, Text} from './common';
import {Colors, fontSize, Spacing} from '../theme';
interface IWorkoutCard {
  item: Workout;
}
const WorkoutCard = ({item}: IWorkoutCard) => {
  return (
    <Card>
      <Text style={styles.heading}>{item.title}</Text>

      <Row spaceBetween style={styles.row}>
        <Text style={styles.header}>Exercise Name</Text>
        <Text style={styles.header}>Weight</Text>
      </Row>
      <Column>
        {item.exercises?.map(exercise => (
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
