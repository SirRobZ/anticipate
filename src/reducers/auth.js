
import {
  AUTHENTICATION_API_REQUEST,
  AUTHENTICATION_API_SUCCESS,
  AUTHENTICATION_API_FAILURE,
  SAVE_AUTHENTICATION_STATE,
} from '../constants';

const initialState = {
  loading: false,
  authenticated: false,
  email: '',
  tokens: [],
  loginError: null,

  registering: false,
  registerError: null,
};

export default function eventsReducer(state = initialState, action){
  switch (action.type) {

    case AUTHENTICATION_API_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTHENTICATION_API_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case AUTHENTICATION_API_FAILURE:
      return {
        ...state,
        loading: false,
        loginError: action.payload,
      };

    case SAVE_AUTHENTICATION_STATE:
      return {
        ...state,
        email: action.payload.email,
        tokens: action.payload.tokens,
      };

    default:
      return state;
  }
}
