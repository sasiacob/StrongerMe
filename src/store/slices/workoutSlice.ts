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
    updateWorkout: (state, {payload}: PayloadAction<Workout>) => {
      const index = state.workouts.findIndex(
        workout => workout.id == payload.id,
      );
      if (index == -1) throw new Error(`Undefined workout id: ${payload.id}`);

      const newArray = [...state.workouts];
      newArray[index] = payload;
      state.workouts = newArray;
    },
    removeWorkout: (state, {payload}: PayloadAction<string>) => {
      state.workouts = state.workouts.filter(workout => workout.id !== payload);
    },
    addExercise: (state, {payload}: PayloadAction<Exercise>) => {
      state.exercises = [...state.exercises, payload];
    },
    updateExercise: (state, {payload}: PayloadAction<Exercise>) => {
      const index = state.exercises.findIndex(
        exercise => exercise.id == payload.id,
      );
      if (index == -1) throw new Error(`Undefined exercise id: ${payload.id}`);

      const newArray = [...state.exercises];
      newArray[index] = payload;
      state.exercises = newArray;
    },
    removeExercise: (state, {payload}: PayloadAction<string>) => {
      state.exercises = state.exercises.filter(
        exercise => exercise.id !== payload,
      );
    },
    addWorkoutLog: (state, {payload}: PayloadAction<WorkoutLog>) => {
      state.workoutLogs = [payload, ...state.workoutLogs];
    },
    updateWorkoutLog: (state, {payload}: PayloadAction<WorkoutLog>) => {
      const index = state.workoutLogs.findIndex(
        workoutLog => workoutLog.id == payload.id,
      );
      if (index == -1)
        throw new Error(`Undefined workoutLog id: ${payload.id}`);

      const newArray = [...state.workoutLogs];
      newArray[index] = payload;
      state.workoutLogs = newArray;
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
  updateWorkout,
  addExercise,
  updateExercise,
  removeExercise,
  addWorkoutLog,
  updateWorkoutLog,
  removeWorkoutLog,
} = workoutSlice.actions;

export const workoutSelector = (state: RootState) => state.workout;
