import * as types from '../constants/ActionTypes';
/*import omit from 'lodash/object/omit';
 import assign from 'lodash/object/assign';
 import mapValues from 'lodash/object/mapValues';*/
var _ = require('lodash');

const initialState = {
  books: [],//首页书籍列表
  loanlist:[],//捐书列表
  onebook:{},//根据ISBN返回的书籍详情
  curbook:{}//查看书的详情
};

export default function books(state = initialState, action) {
  switch (action.type) {
    case types.LOAN_BOOK_LIST:
      const {loanlist} = action;
      return _.merge({},state, {loanlist:loanlist});

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
      return _.merge({},state,{onebook:onebook});

    case types.FETCH_ONE_BOOK:
      const curbook = action.curbook;
      return _.merge({},state,{curbook:curbook});

    case types.BOOK_LIST:
      const books = action.books;
      return _.merge({}, state,{books:books});

    case types.DELETE_BOOK:
      return _.merge({},state, { boks:state.books.filter( book => book._id !== action.id )})

    default:
      return state;
  }
}
