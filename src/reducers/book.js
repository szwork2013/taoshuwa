import * as types from '../constants/ActionTypes';
import {
  LOAN_BOOK_LIST,
  CHECK_BOOK,
  FETCH_ONE_BOOK,
  BOOK_LIST,
  ADD_BOOK,
  DELETE_BOOK
} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'
/*import omit from 'lodash/object/omit';
 import assign from 'lodash/object/assign';
 import mapValues from 'lodash/object/mapValues';*/
var _ = require('lodash');

const initialState = fromJS({
  books: [], //首页书籍列表
  loanlist: [], //捐书列表
  onebook: {}, //根据ISBN返回的书籍详情
  curbook: {} //查看书的详情
});

export const booklist = createReducer(initialState, {
  [BOOK_LIST]: (state, {books}) => {
    const count = state.get('books').count();
    if (count === 0) {
      //直接替换
      return state.merge({books: books})
    } else {
      //在已有的数组之后追加数据,点击加载更多会出现问题
      return state.mergeDeep({
        books: state.get('books').push({books:books})
      })
    }

  },
  [LOAN_BOOK_LIST]: (state, {loanlist}) => {
    return state.merge({loanlist: loanlist})
  },
  [FETCH_ONE_BOOK]: (state, {curbook}) => {
    return state.merge({curbook: curbook})
  },
  [CHECK_BOOK]: (state, {book}) => {
    return state.merge({onebook: book})
  },
  [ADD_BOOK]: (state, {loanlist}) => {
    return state.merge({loanlist: loanlist})
  },
  [DELETE_BOOK]: (state, {id}) => {
    return state.merge({
        books: state.get('books').filter((item) =>{
          return item.get('_id') != id;
      })
    })
  }
})
