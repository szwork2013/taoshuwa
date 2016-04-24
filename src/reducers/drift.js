import * as types from '../constants/ActionTypes';
import {MESSAGE_LIST, BOOK_STATUS} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'

const initialState = fromJS({
  messagelist: [], //我的消息列表
  borrowlist: [], //我的借书列表
  loanlist:[],//我的捐书列表
  desirelist:[],//我的心愿单列表
  bookstatus: {}, //当前查看的书的状态
});

export default createReducer(initialState, {
  ['MESSAGE_LIST']: (state, action) => {
    return state.merge({messagelist: action.messagelist})
  },
  ['BORROW_LIST']:(state, action) =>{
    return state.merge({borrowlist: action.borrowlist})
  },
  ['LOAN_LIST']: (state, action) => {
    return state.merge({loanlist: action.loanlist})
  },
  ['DESIRE_LIST']:(state, action) =>{
    return state.merge({desirelist: action.desirelist})
  },
  ['BOOK_STATUS']: (state, action) => {
    return state.merge({bookstatus: action.bookstatus})
  }
})
