import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ExerciseStack, HomeStack, WorkoutStack} from './StackNavigators';
import {stacks} from './screenNames';

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen name={stacks.homeStack} component={HomeStack} />
        <Tab.Screen name={stacks.workoutStack} component={WorkoutStack} />
        <Tab.Screen name={stacks.exerciseStack} component={ExerciseStack} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;
