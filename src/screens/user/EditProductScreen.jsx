import React, { useCallback, useEffect, useReducer } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Platform,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { CustomHeaderButton } from '../../components/UI/CustomHeaderButton';
import { Input } from '../../components/UI/Input';
import { createProduct, updateProduct } from '../../store/actions/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value,
      };

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid,
      };

      let updatedFormIsValid = true;
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
      }

      return {
        ...state,
        formIsValid: updatedFormIsValid,
        inputValidities: updatedValidities,
        inputValues: updatedValues,
      };

    default:
      return state;
  }
};

export const EditProductScreen = ({ navigation }) => {
  const prodId = navigation.getParam('productId');
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((pr) => pr.id === prodId)
  );

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: editedProduct ? `${editedProduct.price}` : '',
      description: editedProduct ? editedProduct.description : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check errors in the form', [
        { text: 'Okay' },
      ]);
      return;
    }
    if (editedProduct) {
      dispatch(
        updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description,
          +formState.inputValues.price
        )
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description,
          +formState.inputValues.price
        )
      );
    }
    navigation.goBack();
  }, [dispatch, prodId, formState]);

  useEffect(() => {
    navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}
      keyboardVerticalOffset={50}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title"
            keyboardType="default"
            autoCapitalization="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title : ''}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl : ''}
            initiallyValid={!!editedProduct}
            required
          />

          <Input
            id="price"
            label="Price"
            errorText="Please enter a valid price"
            keyboardType="decimal-pad"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? `${editedProduct.price}` : ''}
            initiallyValid={!!editedProduct}
            required
            min={0.1}
          />
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description"
            keyboardType="default"
            autoCapitalization="sentences"
            autoCorrect
            multiline
            numberOfLiners={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description : ''}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = ({ navigation }) => {
  const submitFn = navigation.getParam('submit');
  return {
    headerTitle: navigation.getParam('productId')
      ? 'Edit Product'
      : 'Add Product',
    headerRight: () => (
      <CustomHeaderButton
        name={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
        onPress={submitFn}
      />
    ),
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
