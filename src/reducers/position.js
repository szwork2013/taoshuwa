import {USER_NOW_POSITION} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'

const initialState = fromJS({nowAddress: '', nowPoint: []});

export default createReducer(initialState, {
  [USER_NOW_POSITION]: (state, {address, point}) => {
    console.log('position address:',address);
    return state.merge({nowAddress: address, nowPoint: point})
  }
})
