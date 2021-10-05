export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => async (dispatch) => {
  try {
    const response = await fetch('http://10.0.1.50:3000/orders');

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const orders = await response.json();

    dispatch({ type: SET_ORDERS, orders });
  } catch (error) {
    throw error;
  }
};

export const addOrder = (cartItems, totalAmount) => async (dispatch) => {
  const date = new Date();

  const response = await fetch('http://10.0.1.50:3000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: data.name,
      items: cartItems,
      amount: totalAmount,
      date,
    }),
  });

  if (!response.ok) {
    throw new Error('Something went wrong!');
  }

  const data = await response.json();

  dispatch({
    type: ADD_ORDER,
    orderData: {
      id: data.name,
      items: cartItems,
      amount: totalAmount,
      date,
    },
  });
};
