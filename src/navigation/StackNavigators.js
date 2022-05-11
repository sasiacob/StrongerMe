import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ExerciseDetailsScreen, HomeScreen} from '../screens';
import {EXERCISE_DETAILS_SCREEN, HOME_SCREEN} from './screenNames';

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
