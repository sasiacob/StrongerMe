import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ExerciseStack,
  HomeStack,
  LogsStack,
  WorkoutStack,
} from './StackNavigators';
import {stacks} from './screenNames';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),
            tabBarLabel: 'Home',
          }}
          name={stacks.homeStack}
          component={HomeStack}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="dumbbell" size={size} color={color} />
            ),
            tabBarLabel: 'Workouts',
          }}
          name={stacks.workoutStack}
          component={WorkoutStack}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="dumbbell" size={size} color={color} />
            ),
            tabBarLabel: 'Exercises',
          }}
          name={stacks.exerciseStack}
          component={ExerciseStack}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="history" size={size} color={color} />
            ),
            tabBarLabel: 'Logs',
          }}
          name={stacks.logStack}
          component={LogsStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
