import {StyleSheet, Text, View} from 'react-native';
import React, {FunctionComponent} from 'react';
import {Exercise} from '../API';

const ExerciseCard = ({exercise}: {exercise: Exercise}) => {
  return (
    <View style={styles.exerciseContainer}>
      <Text>
        <Text style={styles.exerciseHeading}>{exercise.name}</Text>
        {`\n${exercise.description}`}
        {`\n${exercise.sets}`}
        {`\n${exercise.weight}`}
        {`\n${exercise.category}`}
      </Text>
    </View>
  );
};

export default ExerciseCard;

const styles = StyleSheet.create({
  exerciseContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 2,
    elevation: 4,
    flexDirection: 'row',
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
