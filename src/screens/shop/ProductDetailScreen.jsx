import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  Button,
  ScrollView,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Colors from '../../constants/Colors';
import { addToCart } from '../../store/actions/cart';

export const ProductDetailScreen = ({ navigation }) => {
  const productId = navigation.getParam('productId');
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  const dispatch = useDispatch();

  //   console.log(selectedProduct);

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to cart"
          onPress={() => dispatch(addToCart(selectedProduct))}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    fontFamily: 'montserrat',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: 'montserrat',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
