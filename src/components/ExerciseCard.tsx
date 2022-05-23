import {StyleSheet, View} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Exercise} from '../API';
import {Text, Card, Row} from './common';
import {Colors, fontSize, Spacing} from '../theme';
const ExerciseCard = ({exercise}: {exercise: Exercise}) => {
  return (
    <Card>
      <Text style={styles.heading}>{exercise.name}</Text>
      <Row spaceBetween style={styles.row}>
        <Text style={styles.bolded}>Description</Text>
        <Text>{exercise.description}</Text>
      </Row>
      <Row spaceBetween style={styles.row}>
        <Text style={styles.bolded}>Category</Text>
        <Text>{exercise.category}</Text>
      </Row>
      <Row spaceBetween style={styles.row}>
        <Text style={styles.bolded}>Weight</Text>
        <Text>{exercise.weight}</Text>
      </Row>
      <Row spaceBetween style={styles.row}>
        <Text style={styles.bolded}>Sets</Text>
        <Text>{exercise.sets}</Text>
      </Row>
      <Row spaceBetween style={styles.row}>
        <Text style={styles.bolded}>Reps</Text>
        <Text>{exercise.reps.join(', ')}</Text>
      </Row>
    </Card>
  );
};

export default ExerciseCard;

const styles = StyleSheet.create({
  heading: {
    fontSize: fontSize.xLarge,
  },
  row: {
    paddingVertical: Spacing.small,
    borderBottomWidth: 1,
    borderBottomColor: Colors.onPrimary + Colors.semiTransparent,
    width: '70%',
    alignSelf: 'center',
  },
  bolded: {
    fontWeight: '700',
  },
});
