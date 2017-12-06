import {
  AUTHENTICATION_API_REQUEST,
  AUTHENTICATION_API_SUCCESS,
  AUTHENTICATION_API_FAILURE,
  SAVE_AUTHENTICATION_STATE,
} from '../constants';


// action creator
export function loginRequest(){
  return {
    type: AUTHENTICATION_API_REQUEST
  };
}

export function loginSuccess(){
  return {
    type: AUTHENTICATION_API_SUCCESS
  }
}

export function loginFailure(error){
  return {
    type: AUTHENTICATION_API_FAILURE,
    payload: error,
  };
}

export function saveAuthState(user){
  return {
    type: SAVE_AUTHENTICATION_STATE,
    payload: user,
  }
}
