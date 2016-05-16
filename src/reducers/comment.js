import * as types from '../constants/ActionTypes';
import {COMMENT_LIST} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'

const initialState = fromJS({
  commentList: []
});

export default createReducer(initialState, {
  ['COMMENT_LIST']: (state, action) => {
    return state.merge({commentList: action.commentList})
  }
})
