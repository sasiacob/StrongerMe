import {StyleSheet, View} from 'react-native';
import React from 'react';
import {WorkoutLog} from '../API';
import {Card, Column, Row, Text} from './common';
import {Colors, fontSize, Spacing} from '../theme';
interface IWorkoutLogCard {
  item: WorkoutLog;
}
const WorkoutLogCard = ({item}: IWorkoutLogCard) => {
  return (
    <Card>
      <Text style={styles.heading}>
        {new Date(parseInt(item.id)).toLocaleString()}
      </Text>
      <View style={styles.spacing} />
      <Row style={styles.row}>
        <Text style={[styles.header, styles.text]}>Exercise</Text>
        <Text style={[styles.header, styles.text]}>Weight</Text>
        <Text style={[styles.header, styles.text]}>Sets</Text>
        <Text style={[styles.header, styles.text]}>Reps</Text>
      </Row>

      <Column>
        {item.exercises?.map(exercise => (
          <Row key={exercise.id} style={styles.row}>
            <Text style={styles.text}>{exercise.name}</Text>
            <Text style={styles.text}>{exercise.weight}</Text>
            <Text style={styles.text}>{exercise.sets}</Text>
            <Text style={styles.text}>{exercise.reps.join(' ')}</Text>
          </Row>
        ))}
      </Column>
    </Card>
  );
};
export default WorkoutLogCard;
const styles = StyleSheet.create({
  heading: {
    fontSize: fontSize.xLarge,
  },
  header: {fontWeight: '700'},
  row: {
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  spacing: {
    height: Spacing.double,
  },
  text: {
    flex: 1,

    textAlign: 'center',
  },
});
