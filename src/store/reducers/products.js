import PRODUCTS from '../../data/dummy-data';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'value':
      return { ...state };

    default:
      return state;
  }
};
