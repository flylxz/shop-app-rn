import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { ProductItem } from '../../components/shop/ProductItem';

export const ProductsOverviewScreen = () => {
  const { availableProducts } = useSelector((state) => state.products);
  return (
    <FlatList
      data={availableProducts}
      renderItem={({ item }) => (
        <ProductItem
          item={item}
          onViewDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

// const styles = StyleSheet.create({});
