import * as types from '../constants/ActionTypes';
/*import omit from 'lodash/object/omit';
 import assign from 'lodash/object/assign';
 import mapValues from 'lodash/object/mapValues';*/
var _ = require('lodash');

const initialState = {
  books: []
};

export default function books(state = initialState, action) {
  console.log('action:',action);
  switch (action.type) {

    case types.ADD_BOOK:
      const book = action.book;
      return {
        books: state.books.push(book)
      }

    case types.BOOK_LIST:
      return {
        books: action.books
      }

    case types.DELETE_BOOK:
      return {
        friends: state.books.filter( book => {
          return book._id !== action.id;
        }),
      }
    default:
      return state;
  }
}
