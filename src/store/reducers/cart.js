import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import { CartItem } from '../../models/cart';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, price, title } = action.product;

      let updatedOrNewCartItem;

      if (state.items[id]) {
        updatedOrNewCartItem = new CartItem(
          id,
          state.items[id].quantity + 1,
          price,
          title,
          price + state.items[id].sum
        );
      } else {
        updatedOrNewCartItem = new CartItem(id, 1, price, title, price);
      }
      return {
        ...state,
        items: { ...state.items, [id]: updatedOrNewCartItem },
        totalAmount: price + state.totalAmount,
      };

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;

      let updatedCartItems;
      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          action.pid,
          selectedCartItem.quantity - 1,
          selectedCartItem.price,
          selectedCartItem.title,
          selectedCartItem.sum - selectedCartItem.price
        );

        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.price,
      };

    case ADD_ORDER:
      return initialState;

    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }

      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      };

    default:
      return state;
  }
};
