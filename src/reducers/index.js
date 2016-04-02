import { combineReducers } from 'redux';
import friendlist from './friendlist';
import booklist from './book';

export default combineReducers({
  friendlist,
  booklist
})