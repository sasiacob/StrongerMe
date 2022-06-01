import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ExerciseDetailsScreen,
  ExercisesScreen,
  HomeScreen,
  LogsScreen,
  WorkoutDetailsScreen,
  WorkoutsScreen,
  LogDetailsScreen,
  AddExerciseScreen,
  AddWorkoutScreen,
  AddLogScreen,
  AccountScreen,
} from '../screens';
import {
  ADD_EXERCISE_SCREEN,
  ADD_LOGS_SCREEN,
  ADD_WORKOUTS_SCREEN,
  EXERCISES_SCREEN,
  EXERCISE_DETAILS_SCREEN,
  HOME_SCREEN,
  LOG_DETAILS_SCREEN,
  LOGS_SCREEN,
  WORKOUTS_SCREEN,
  WORKOUT_DETAILS_SCREEN,
  ACCOUNT_SCREEN,
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
    <Stack.Screen name={ADD_WORKOUTS_SCREEN} component={AddWorkoutScreen} />
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
    <Stack.Screen name={ADD_EXERCISE_SCREEN} component={AddExerciseScreen} />
  </Stack.Navigator>
);
export const LogsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{headerShown: false}}
      name={LOGS_SCREEN}
      component={LogsScreen}
    />
    <Stack.Screen name={LOG_DETAILS_SCREEN} component={LogDetailsScreen} />
    <Stack.Screen name={ADD_LOGS_SCREEN} component={AddLogScreen} />
  </Stack.Navigator>
);
export const AccountStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{headerShown: false}}
      name={ACCOUNT_SCREEN}
      component={AccountScreen}
    />
  </Stack.Navigator>
);
