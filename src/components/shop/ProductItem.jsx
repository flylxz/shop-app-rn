import React, { Children } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Colors from '../../constants/Colors';

export const ProductItem = ({ item, onSelect, children }) => {
  const TouchableComponent =
    Platform.OS === 'android' && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.action}>{children}</View>
          </View>
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 350,
    margin: 20,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  details: {
    alignItems: 'center',
    height: '15%',
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontFamily: 'montserrat-bold',
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    fontFamily: 'montserrat',
    color: '#888',
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '23%',
  },
});
