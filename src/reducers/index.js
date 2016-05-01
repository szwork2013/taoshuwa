import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import book from './book';
import auth from  './auth';
import category from  './category';
import drift from  './drift';
import wx from  './wx';
import posi from  './position';

export default combineReducers({
  book,
  auth,
  category,
  drift,
  wx,
  posi,
  routing: routerReducer
})
