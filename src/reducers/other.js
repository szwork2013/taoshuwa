import * as types from '../constants/ActionTypes';
import {SET_CITY_MODAL,SET_FITCHING} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'

const initialState = fromJS({
  cityModal:false, //选择城市的modal
  isFetching:false//设置查询等待动画
});

export default createReducer(initialState, {
  ['SET_CITY_MODAL']: (state, action) => {
    return state.merge({cityModal: action.cityModal})
  },
  ['SET_FITCHING']:(state,action) =>{
    return state.merge({isFetching: action.isFetching})
  }
})
