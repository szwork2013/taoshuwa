import {USER_NOW_POSITION, BOOK_POSITION, BORROW_POSITION} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'

const initialState = fromJS({
  nowAddress: '',
  nowPoint: [],
  bookPosi: {},
  borrowPosi: {}
});

export default createReducer(initialState, {
  [USER_NOW_POSITION]: (state, {address, point, curCity}) => {
    return state.merge({nowAddress: address, nowPoint: point, curCity:curCity})
  },
  [BOOK_POSITION]: (state, {bookPosi}) => {
    return state.merge({bookPosi: bookPosi})
  },
  [BORROW_POSITION]: (state, {borrowPosi}) => {
    return state.merge({borrowPosi: borrowPosi})
  }
})
