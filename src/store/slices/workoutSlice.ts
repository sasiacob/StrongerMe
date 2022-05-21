import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Exercise, Workout} from '../../API';
import {RootState} from '../rootReducer';

interface IInitialState {
  workouts: Workout[];
  exercises: Exercise[];
}
const initialState: IInitialState = {
  workouts: [],
  exercises: [],
};
const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    addWorkout: (state, {payload}: PayloadAction<Workout>) => {
      state.workouts = [...state.workouts, payload];
    },
    removeWorkout: (state, {payload}: PayloadAction<string>) => {
      state.workouts = state.workouts.filter(workout => workout.id !== payload);
    },
    addExercise: (state, {payload}: PayloadAction<Exercise>) => {
      state.exercises = [...state.exercises, payload];
    },
    removeExercise: (state, {payload}: PayloadAction<string>) => {
      state.exercises = state.exercises.filter(
        exercise => exercise.id !== payload,
      );
    },
  },
});

export default workoutSlice.reducer;

export const {addWorkout, removeWorkout, addExercise, removeExercise} =
  workoutSlice.actions;

export const workoutSelector = (state: RootState) => state.workout;
