import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CartItem = ({ item, onRemove, deletable }) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{item.quantity} </Text>
        <Text style={styles.text}>{item.title}</Text>
      </Text>

      <View style={styles.cartItem}>
        <Text style={styles.text}>${item.price.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'montserrat',
    color: '#888',
    fontSize: 16,
  },
  text: {
    fontFamily: 'montserrat-bold',
    fontSize: 16,
  },

  deleteButton: {
    marginLeft: 20,
  },
});
