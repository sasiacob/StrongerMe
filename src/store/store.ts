import {Action, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {ThunkAction} from 'redux-thunk';
import {persistReducer} from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import rootReducer, {RootState} from './rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();

const persisConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const persistedReducer = persistReducer(persisConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
});
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
export default store;
