import * as types from '../constants/ActionTypes';
import {SCAN_CONFIG} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'

const initialState = fromJS({
  scanconfig:{} //扫描相关配置
});

export default createReducer(initialState, {
  ['SCAN_CONFIG']: (state, action) => {
    alert('scanconfig');
    return state.merge({scanconfig: action.scanconfig})
  }
})
