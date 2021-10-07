import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from '../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expiryTime) => (dispatch) => {
  dispatch(setLogoutTimer(expiryTime));
  dispatch({ type: AUTHENTICATE, userId, token });
};

export const signUp = (email, password) => async (dispatch) => {
  const auth = getAuth();
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    dispatch(
      authenticate(
        response._tokenResponse.localId,
        response._tokenResponse.idToken,
        +response._tokenResponse.expiresIn * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + response._tokenResponse.expiresIn * 1000
    );
    storeData(
      response._tokenResponse.idToken,
      response._tokenResponse.localId,
      expirationDate
    );
    // console.log('success');
  } catch (error) {
    throw new Error(error);
  }
};

export const logIn = (email, password) => async (dispatch) => {
  const auth = getAuth();

  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    if (response.ok) {
      const errorResponse = await response.json();
      console.log('!response.ok', errorResponse);
    }
    dispatch(
      authenticate(
        response._tokenResponse.localId,
        response._tokenResponse.idToken,
        +response._tokenResponse.expiresIn * 1000
      )
    );

    const expirationDate = new Date(
      new Date().getTime() + +response._tokenResponse.expiresIn * 1000
    );

    storeData(
      response._tokenResponse.idToken,
      response._tokenResponse.localId,
      expirationDate
    );
  } catch (error) {
    let message = 'error';
    throw new Error(message);
  }
};

export const logOut = () => async (dispatch) => {
  clearLogoutTimer();
  try {
    await AsyncStorage.removeItem('userData');
  } catch (e) {
    console.log('Error remove from store.', e);
  }
  dispatch({ type: LOGOUT });
};

clearLogoutTimer = () => {
  // console.log('timer clear');
  clearTimeout(timer);
};

const setLogoutTimer = (expirationTime) => (dispatch) => {
  // console.log('timer');
  timer = setTimeout(() => dispatch(logOut()), expirationTime / 1000);
};

const storeData = async (token, userId, expirationDate) => {
  // console.log(token, userId, expirationDate);
  try {
    const jsonValue = JSON.stringify({
      token,
      userId,
      expiryDate: expirationDate.toISOString(),
    });
    await AsyncStorage.setItem('userData', jsonValue);
    // console.log('success');
  } catch (e) {
    console.log('store error', e);
  }
};
