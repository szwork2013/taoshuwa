import {USER_NOW_POSITION, BOOK_POSITION, BORROW_POSITION,SEARCH_POSITION} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'

const initialState = fromJS({
  autoPosi:{},// 自动定位地址
  searchPosi:{},//设置搜索地址
  bookPosi: {},//设置图书地址
  borrowPosi: {}//设置借书地址
});

export default createReducer(initialState, {
  [USER_NOW_POSITION]: (state, {autoPosi}) => {
    return state.merge({autoPosi})
  },
  [SEARCH_POSITION]:(state,{searchPosi}) =>{
    return state.merge({searchPosi})
  },
  [BOOK_POSITION]: (state, {bookPosi}) => {
    return state.merge({bookPosi: bookPosi})
  },
  [BORROW_POSITION]: (state, {borrowPosi}) => {
    return state.merge({borrowPosi: borrowPosi})
  }
})
