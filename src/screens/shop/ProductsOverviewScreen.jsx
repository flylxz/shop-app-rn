import React from 'react';
import { Button, FlatList, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ProductItem } from '../../components/shop/ProductItem';
import { CustomHeaderButton } from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import { addToCart } from '../../store/actions/cart';

export const ProductsOverviewScreen = ({ navigation }) => {
  const { availableProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  return (
    <FlatList
      data={availableProducts}
      renderItem={({ item }) => (
        <ProductItem
          item={item}
          onSelect={() => selectItemHandler(item.id, item.title)}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => selectItemHandler(item.id, item.title)}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => dispatch(addToCart(item))}
          />
        </ProductItem>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <CustomHeaderButton
        name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => navigation.toggleDrawer()}
        left
      />
    ),
    headerRight: () => (
      <CustomHeaderButton
        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
        onPress={() => navigation.navigate('Cart')}
      />
    ),
  };
};

// const styles = StyleSheet.create({});
