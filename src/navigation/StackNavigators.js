import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ExerciseDetailsScreen,
  ExercisesScreen,
  HomeScreen,
  WorkoutDetailsScreen,
  WorkoutsScreen,
} from '../screens';
import {
  EXERCISES_SCREEN,
  EXERCISE_DETAILS_SCREEN,
  HOME_SCREEN,
  WORKOUTS_SCREEN,
  WORKOUT_DETAILS_SCREEN,
} from './screenNames';

const Stack = createNativeStackNavigator();

export const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={HOME_SCREEN} component={HomeScreen} />
    <Stack.Screen
      name={EXERCISE_DETAILS_SCREEN}
      component={ExerciseDetailsScreen}
    />
  </Stack.Navigator>
);
export const WorkoutStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={WORKOUTS_SCREEN}
      component={WorkoutsScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={WORKOUT_DETAILS_SCREEN}
      component={WorkoutDetailsScreen}
    />
  </Stack.Navigator>
);
export const ExerciseStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{headerShown: false}}
      name={EXERCISES_SCREEN}
      component={ExercisesScreen}
    />
    <Stack.Screen
      name={EXERCISE_DETAILS_SCREEN}
      component={ExerciseDetailsScreen}
    />
  </Stack.Navigator>
);
