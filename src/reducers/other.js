import * as types from '../constants/ActionTypes';
import {SET_CITY_MODAL} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'

const initialState = fromJS({
  cityModal:false //选择城市的modal
});

export default createReducer(initialState, {
  ['SET_CITY_MODAL']: (state, action) => {
    return state.merge({cityModal: action.cityModal})
  }
})
