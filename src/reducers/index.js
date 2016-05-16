import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import book from './book';
import auth from  './auth';
import category from  './category';
import drift from  './drift';
import wx from  './wx';
import posi from  './position';
import comment from  './comment';
import other from  './other';

export default combineReducers({
  book,
  auth,
  category,
  drift,
  comment,
  wx,
  posi,
  other,
  routing: routerReducer
})
