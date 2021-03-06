import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  ActivityIndicator,
  SafeAreaView,
  View,
  Text,
  StatusBar,
  Platform,
} from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';
import thunk from 'redux-thunk';

import { productReducer } from './src/store/reducers/products';
import { cartReducer } from './src/store/reducers/cart';
import { ordersReducer } from './src/store/reducers/orders';
import { authReducer } from './src/store/reducers/auth';
import ShopNavigator from './src/navigation/ShopNavigator';
import Colors from './src/constants/Colors';
import { NavigationContainer } from './src/navigation/NavigationContainer';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const [loaded, error] = useFonts({
    montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-bold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });

  if (!loaded) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View>
          <Text>
            <ActivityIndicator size="large" color={Colors.primary} />
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error with fonts: {error.message}</Text>;
      </View>
    );
  }

  return (
    <Provider store={store}>
      <StatusBar
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
        backgroundColor={Platform.OS === 'android' ? Colors.primary : ''}
      />
      <NavigationContainer />
    </Provider>
  );
}
