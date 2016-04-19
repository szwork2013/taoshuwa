import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import book from './book';
import auth from  './auth';
import category from  './category';

export default combineReducers({
  book,
  auth,
  category,
  routing: routerReducer
})
