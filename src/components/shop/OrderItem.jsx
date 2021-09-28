import React, { useState } from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';

import Colors from '../../constants/Colors';
import { CartItem } from './CartItem';

export const OrderItem = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.date}>
          {item.date.toLocaleDateString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
        <Text style={styles.totalAmount}>${item.totalAmount.toFixed(2)}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide details' : 'Show Details'}
        onPress={() => setShowDetails((state) => !state)}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {Object.values(item.items).map((i) => (
            <CartItem item={i} key={i.id} deletable={false} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    height: 150,
    justifyContent: 'space-between',
  },
  summary: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalAmount: {
    fontFamily: 'montserrat-bold',
    fontSize: 16,
    color: 'black',
  },
  date: {
    fontFamily: 'montserrat',
    fontSize: 16,
    color: '#888',
  },
  detailItems: {
    width: '100%',
  },
});
