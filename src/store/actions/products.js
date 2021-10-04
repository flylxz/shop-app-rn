import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, child, get } from 'firebase/database';
import { firebaseConfig } from '../../firebase/config';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return (dispatch) => {
    const products = () =>
      get(child(ref(db), 'products/'))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const transformData = Object.values(data);
            return transformData;
            // dispatch({ type: SET_PRODUCTS, products: transformData });
          } else {
            console.log('No data available');
          }
        })
        .catch((error) => {
          console.error(error);
        });

    const data = products();
    dispatch({ type: SET_PRODUCTS, products: data });
  };
};

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  pid: productId,
});

export const createProduct = (title, imageUrl, description, price) => {
  return async (dispatch) => {
    const prodId = Date.now();
    const postProduct = (title, imageUrl, description, price) => {
      set(ref(db, 'products/' + prodId), {
        id: prodId,
        title,
        imageUrl,
        price,
        description,
      });
    };

    postProduct(prodId, title, imageUrl, description, price);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: prodId,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, imageUrl, description, price) => ({
  type: UPDATE_PRODUCT,
  pid: id,
  productData: {
    title,
    description,
    imageUrl,
    price,
  },
});
