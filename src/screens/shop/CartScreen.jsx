import React from 'react';
import { Button, StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CartItem } from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';

export const CartScreen = () => {
  const { items, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          disabled={!Object.values(items).length}
          onPress={() => dispatch(addOrder(items, totalAmount))}
        />
      </View>
      <View>
        <FlatList
          data={Object.values(items).sort((a, b) => (a.id > b.id ? 1 : -1))}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onRemove={() => dispatch(removeFromCart(item.id))}
              deletable
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
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,

    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'montserrat-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.accent,
  },
});
