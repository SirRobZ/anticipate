import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';
import auth from './auth';
import events from './events'

export default combineReducers({
  auth,
  events,
  form: formReducer,
});
