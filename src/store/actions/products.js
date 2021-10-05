export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => async (dispatch) => {
  const response = await fetch('http://10.0.1.50:3000/products');
  if (!response.ok) {
    throw new Error('Something went wrong!');
  }
  const data = await response.json();

  dispatch({ type: SET_PRODUCTS, products: data });
};

export const deleteProduct = (productId) => async (dispatch) => {
  await fetch(`http://10.0.1.50:3000/products/${productId}`, {
    method: 'DELETE',
  });

  dispatch({
    type: DELETE_PRODUCT,
    pid: productId,
  });
};

export const createProduct =
  (title, imageUrl, description, price) => async (dispatch) => {
    const prodId = Date.now().toString();

    await fetch('http://10.0.1.50:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: prodId,
        ownerId: 'u1',
        title,
        imageUrl,
        price,
        description,
      }),
    });

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

export const updateProduct =
  (id, title, imageUrl, description, price) => async (dispatch) => {
    const response = await fetch(`http://10.0.1.50:3000/products!/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        ownerId: 'u1',
        title,
        imageUrl,
        price,
        description,
      }),
    });
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    // const data = await response.json();
    // console.log('update product action: ', data);

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
