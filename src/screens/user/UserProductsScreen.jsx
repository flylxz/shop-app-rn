import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { ProductItem } from '../../components/shop/ProductItem';
import { CustomHeaderButton } from '../../components/UI/CustomHeaderButton';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/products';

export const UserProductsScreen = ({ navigation }) => {
  const { userProducts } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem item={item} onSelect={() => {}}>
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() =>
              navigation.navigate('EditProduct', { productId: item.id })
            }
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => dispatch(deleteProduct(item.id))}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Your Products',
    headerLeft: () => (
      <CustomHeaderButton
        name={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
        onPress={() => navigation.toggleDrawer()}
        left
      />
    ),
    headerRight: () => (
      <CustomHeaderButton
        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
        onPress={() => navigation.navigate('EditProduct')}
      />
    ),
  };
};

const styles = StyleSheet.create({});
