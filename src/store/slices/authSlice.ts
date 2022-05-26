import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../rootReducer';

export interface IAuthError {
  message: string;
}

export interface ICurentUser {
  id: string;
  display_name: string;
  email: string;
  photo_url: string;
}
export interface IAuthState {
  isAuth: boolean;
  currentUser?: ICurentUser;
  isLoading: boolean;
  error: IAuthError;
}

export const initialState: IAuthState = {
  isAuth: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, {payload}: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setAuthSuccess: (state, {payload}: PayloadAction<ICurentUser>) => {
      state.currentUser = payload;
      state.isAuth = true;
    },
    setLogOut: state => {
      state.isAuth = false;
      state.currentUser = undefined;
    },
    setAuthFailed: (state, {payload}: PayloadAction<IAuthError>) => {
      state.error = payload;
      state.isAuth = false;
    },
  },
});

export const login = () => dispatch => {
  try {
    dispatch(setLoading(true));
    dispatch(setLoading(false));
    const currentUser: ICurentUser = {
      id: '1',
      display_name: 'dd',
      email: 'dd@dd',
      photo_url: '',
    };
    dispatch(setAuthSuccess(currentUser));
  } catch (error) {
    dispatch(setAuthFailed(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logOut = () => dispatch => {
  try {
    dispatch(setLoading(true));
    dispatch(setLogOut());
  } catch (error) {
    dispatch(setAuthFailed(error));
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;

export const {setAuthSuccess, setLogOut, setLoading, setAuthFailed} =
  authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
