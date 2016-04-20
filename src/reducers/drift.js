import * as types from '../constants/ActionTypes';
import {MESSAGE_LIST} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'

const initialState = fromJS({
  messagelist: [], //首页书籍列表
});


export default createReducer(initialState, {
  ['MESSAGE_LIST']: (state,action) => {
    return state.merge({
      messagelist:action.messagelist
    })
  }
})
