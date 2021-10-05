import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Platform,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { OrderItem } from '../../components/shop/OrderItem';
import { CustomHeaderButton } from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import { fetchOrders } from '../../store/actions/orders';

export const OrdersScreen = () => {
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    await dispatch(fetchOrders());
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!orders.length) {
    return (
      <View style={styles.center}>
        <Text>It's empty</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <OrderItem item={item} />}
    />
  );
};

OrdersScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <CustomHeaderButton
        name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => navigation.toggleDrawer()}
        left
      />
    ),
  };
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
