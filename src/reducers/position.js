import {USER_NOW_POSITION, BOOK_POSITION, BORROW_POSITION,SEARCH_POSITION,ADDRESS_LIST, ADD_ADDRESS_INFO} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'

const initialState = fromJS({
  autoPosi:{},// 自动定位地址
  searchPosi:{},//设置搜索地址
  bookPosi: {},//设置图书地址
  borrowPosi: {},//设置借书地址
  addressList:[]//用户的地址列表
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
  },
  [ADD_ADDRESS_INFO]:(state,{oneAddress}) => {
    //需要处理默认选择的情况 修改默认地址
    let oldState = state.getIn(['addressList']).toJS();
    oldState.map(item => {item.isdefault = false; return item});
    oldState.unshift(oneAddress);
    return state.merge({
      addressList: oldState
    })
  },
  [ADDRESS_LIST]:(state, {addressList}) =>{
    //获取后直接替换
    return state.merge({addressList:addressList});
  }
})
