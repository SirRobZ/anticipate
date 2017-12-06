
import { LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_FAILURE } from '../constants';

const initialState = {
  loading: false,
  list: [],
  error: null,
};

export default function eventsReducer(state = initialState, action){
  switch (action.type) {
    case LOAD_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOAD_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload,
      };

    case LOAD_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        list: [],
        error: action.payload,
      };

    default:
      return state;
  }
}
