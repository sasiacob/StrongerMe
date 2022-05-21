import {combineReducers} from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import workoutSlice from './slices/workoutSlice';
const rootReducer = combineReducers({
  auth: authSlice,
  workout: workoutSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
