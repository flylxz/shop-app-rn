import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ProductItem } from '../../components/shop/ProductItem';
import { CustomHeaderButton } from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import { addToCart } from '../../store/actions/cart';
import { fetchProducts } from '../../store/actions/products';

export const ProductsOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const { availableProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('willFocus', loadProducts);

    return () => unsubscribe.remove();
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [dispatch, loadProducts]);

  const loadProducts = async () => {
    setError('');
    setIsRefreshing(true);
    try {
      await dispatch(fetchProducts());
    } catch (error) {
      setError(error.message);
      console.log('error');
    }
    setIsRefreshing(false);
  };

  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screen}>
        <Text>{error}</Text>
        <Button
          title="Try again"
          color={Colors.primary}
          onPress={() => loadProducts()}
        />
      </View>
    );
  }

  if (!availableProducts.length) {
    return (
      <View style={styles.screen}>
        <Text>Nothing here</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
