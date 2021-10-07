import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/Colors';
import { authenticate } from '../store/actions/auth';

export const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryToLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        const transformerData = await JSON.parse(userData);
        if (!userData) {
          navigation.navigate('Auth');
          return;
        }
        const { token, userId, expiryDate } = transformerData;

        const expirationDate = new Date(expiryDate);

        if (expirationDate < new Date() || !token || !userId) {
          navigation.navigate('Auth');
          return;
        }

        const expirationTime = expirationDate.getTime() - new Date().getTime();
        dispatch(authenticate(userId, token, expirationTime));
        navigation.navigate('Shop');
      } catch (e) {
        console.log('error get data from async storage', e);
      }
    };
    tryToLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
