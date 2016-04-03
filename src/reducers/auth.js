import * as types from '../constants/ActionTypes';
const initialState = {
  user: null
};

export default function user(state = initialState, action) {
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
