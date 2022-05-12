import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Exercise} from '../API';

const ExerciseDetailsScreen = ({route}) => {
  const exercise: Exercise = route.params.exercise;
  return (
    <View>
      <Text>{exercise?.name}</Text>
      <Text>{exercise?.id}</Text>
    </View>
  );
};

export default ExerciseDetailsScreen;

const styles = StyleSheet.create({});
