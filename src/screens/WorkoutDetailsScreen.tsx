import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from '../components';
import {useState} from 'react';
import {Workout} from '../API';
import {useSelector} from 'react-redux';
import {updateWorkout, workoutSelector} from '../store/slices/workoutSlice';
import {useDispatch} from 'react-redux';
const WorkoutDetailsScreen = ({route}) => {
  const [workout, setWorkout] = useState<Workout>(route.params.workout);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const {exercises} = useSelector(workoutSelector);

  const dispatch = useDispatch();
  async function onSubmit() {
    try {
      dispatch(updateWorkout(workout));
    } catch (e) {
      console.log('error: ', e);
    }
  }
  function resetValues() {}

  const toggleSelected = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(c => c.filter(i => i != id));
    } else {
      setSelectedIds(c => [...c, id]);
    }
  };
  return (
    <View>
      <Text>WorkoutDetailsScreen</Text>
    </View>
  );
};

export default WorkoutDetailsScreen;

const styles = StyleSheet.create({});
