import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import book from './book';
import auth from  './auth';

export default combineReducers({
  book,
  auth,
  routing: routerReducer
})
