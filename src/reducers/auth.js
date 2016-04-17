import {GET_USERINFO_SUCCESS,GET_USERINFO_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, CHECK_VCODE_SUCCESS,REGISTER_SUCCESS,REGISTER_FAILURE, LOGIN_OUT} from '../constants/ActionTypes.js'
import {createReducer} from 'redux-immutablejs'
import {fromJS, Map, List} from 'immutable'
import {saveCookie, getCookie, signOut} from '../utils/authService'

const initialState = fromJS({
  user:null,
  vcode:'',
  token: getCookie('token') || null
});

export default createReducer(initialState,{
  [GET_USERINFO_SUCCESS]: (state, {user}) => {
    return state.merge({user: user})
  },
  [GET_USERINFO_FAILURE]:(state,action)=> state.set('user',null),

  [LOGIN_SUCCESS]: (state, action) => {
    return state.merge({token: action.token})
  },
  [LOGIN_FAILURE]:() =>{},

  [CHECK_VCODE_SUCCESS]:(state,{vcode}) => state.merge({vcode:vcode}),
  [REGISTER_SUCCESS]: (state, action) => {},
  [REGISTER_FAILURE]: (state, action) => {},

  [LOGIN_OUT]: (state,action)=> {
    return initialState.set('token',null)
  }
})
