import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Exercise, Workout, WorkoutLog} from '../../API';
import {RootState} from '../rootReducer';

interface IInitialState {
  workouts: Workout[];
  exercises: Exercise[];
  workoutLogs: WorkoutLog[];
}
const initialState: IInitialState = {
  workouts: [],
  exercises: [],
  workoutLogs: [],
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
    addWorkoutLog: (state, {payload}: PayloadAction<WorkoutLog>) => {
      state.workoutLogs = [payload, ...state.workoutLogs];
    },
    removeWorkoutLog: (state, {payload}: PayloadAction<string>) => {
      state.workoutLogs = state.workoutLogs.filter(
        workoutLog => workoutLog.id !== payload,
      );
    },
  },
});

export default workoutSlice.reducer;

export const {
  addWorkout,
  removeWorkout,
  addExercise,
  removeExercise,
  addWorkoutLog,
  removeWorkoutLog,
} = workoutSlice.actions;

export const workoutSelector = (state: RootState) => state.workout;
