import React from 'react';
import { StyleSheet, FlatList, Platform, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { OrderItem } from '../../components/shop/OrderItem';
import { CustomHeaderButton } from '../../components/UI/CustomHeaderButton';

export const OrdersScreen = () => {
  const { orders } = useSelector((state) => state.orders);

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
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

const styles = StyleSheet.create({});
