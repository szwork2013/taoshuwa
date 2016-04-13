import * as types from '../constants/ActionTypes';
/*import omit from 'lodash/object/omit';
 import assign from 'lodash/object/assign';
 import mapValues from 'lodash/object/mapValues';*/
var _ = require('lodash');

const initialState = {
  books: [],
  onebook:{},
  curbook:{}
};

export default function books(state = initialState, action) {
  switch (action.type) {

    case types.ADD_BOOK:
      const book = action.json.book;
      if(!book){
        return state ;
      }
      state.books.push(book);
      return {
        books: state.books,
        onebook:state.onebook,
        curbook:state.curbook
      }

    case types.CHECK_BOOK:
      const onebook = action.book;
      return {
        books:state.books,
        onebook:onebook,
        curbook:state.curbook
      }

    case types.FETCH_ONE_BOOK:
      const curbook = action.curbook;
      return {
        books:state.books,
        curbook:curbook,
        onebook:state.onebook,
      }

    case types.BOOK_LIST:
      return {
        books: action.books,
        onebook:state.onebook,
        curbook:state.curbook
      }

    case types.DELETE_BOOK:
      return {
        onebook:state.onebook,
        curbook:state.curbook,
        books:state.books.filter( book => book._id !== action.id )
      }
    default:
      return state;
  }
}
