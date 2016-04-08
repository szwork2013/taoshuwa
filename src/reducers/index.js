import { combineReducers } from 'redux';
import friendlist from './friendlist';
import booklist from './book';
import auth from  './auth';

export default combineReducers({
  friendlist,
  booklist,
  auth
})
