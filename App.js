import React from 'react';
import { createStore, combineReducers } from 'redux';
import { ActivityIndicator, SafeAreaView, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { useFonts } from 'expo-font';

import { productReducer } from './src/store/reducers/products';
import { cartReducer } from './src/store/reducers/cart';
import { ordersReducer } from './src/store/reducers/orders';
import ShopNavigator from './src/navigation/ShopNavigator';
import Colors from './src/constants/Colors';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
      <ShopNavigator />
    </Provider>
  );
}
