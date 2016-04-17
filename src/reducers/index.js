import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import friendlist from './friendlist';
import {booklist} from './book';
import auth from  './auth';

export default combineReducers({
  friendlist,
  booklist,
  routing: routerReducer,
  auth
})
