import { AUTHENTICATE, LOGIN, LOGOUT, SIGNUP } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userID,
      };
    case LOGOUT:
      return initialState;
    // case SIGNUP:
    //   return {
    //     ...state,
    //     token: action.token,
    //     userId: action.userID,
    //   };
    default:
      return state;
  }
};
