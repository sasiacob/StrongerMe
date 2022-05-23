import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {authSelector, ICurentUser, login, logOut, setAuthSuccess, setLogOut} from '../store/slices/authSlice';
import { Text } from '../components';
const AuthScreen = () => {
  const dispatch = useDispatch();
  const data = useSelector(authSelector);

  const {currentUser, isLoading, error, isAuth} = data ?? {};
  if (isLoading)
    return (
      <View>
        <Text> Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  return (
    <View>
      {isAuth ? (
        <Pressable onPress={() => dispatch(logOut())}>
          <Text>Logout</Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
     
            dispatch(login());
          }}>
          <Text>Login</Text>
        </Pressable>
      )}
      <Text>AuthScreen</Text>
      <UserProfile user={currentUser} />
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});

const UserProfile = ({user}: {user?: ICurentUser}) => {
  return (
    <View>
      <Text>{user?.display_name}</Text>
    </View>
  );
};
