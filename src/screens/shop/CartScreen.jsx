import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CartItem } from '../../components/shop/CartItem';
import { Card } from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';

export const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(addOrder(items, totalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <View style={styles.center}>
            <ActivityIndicator size="small" color={Colors.primary} />
          </View>
        ) : (
          <Button
            title="Order Now"
            color={Colors.accent}
            disabled={!Object.values(items).length}
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <View>
        <FlatList
          data={Object.values(items).sort((a, b) => (a.id > b.id ? 1 : -1))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              deletable
              onRemove={() => dispatch(removeFromCart(item.id))}
            />
          )}
        />
      </View>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,

    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'montserrat-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.accent,
  },
  center: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-end',
    marginRight: 40,
  },
});
