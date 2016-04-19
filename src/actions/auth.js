import * as types from '../constants/ActionTypes';
import api from '../api'
import {push} from 'react-router-redux';
import {saveCookie, getCookie, signOut} from '../utils/authService'
import fetch from 'isomorphic-fetch';
import {API_ROOT} from '../config'

//注销时需要处理的任务
//1.将token清空
//2.跳转到登录页面
//3.清除全局全局状态中与登录相关的状态
export function logout() {
  return dispatch => {
    signOut()
    dispatch({type: types.LOGIN_OUT})
    dispatch(push('/login'))
  }
}

export function getVCode(){
  return function(dispatch){
    return api.getVCode()
      .then( data => {
        dispatch({type: types.CHECK_VCODE_SUCCESS, vcode:'1234'});
      })
      .catch( err => {
        console.log('err------:',err);
      })
  }
}

//注册，成功后跳转到登录界面
export function register(regInfo) {
  return function(dispatch, getState) {
    return api
      .register(regInfo)
      .then(data => {
        if (data.statusText === 'OK') {
          alert('注册成功，请登录');
          dispatch(push('/login'))
        }
      })
      .catch(err => {
        if(err && typeof err ==='object' && err.status === 403){
          alert(err.data.err_msg);
        }else{
          console.log('register-----:', err);
        }
      })
  }
}

//user
export function loginIn(username, password) {
  return (dispatch, getState) => {
    return api.localLogin({username:username, password:password})
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json, status}) => {
        if (status !== 'OK') {
          //dispatch(getCaptchaUrl())
          //return dispatch(showMsg(json.data.error_msg || '登录失败'))
          console.log('login failure1');
          return false;
        }
        //得到token,并存储
        saveCookie('token', json.token)
        //获取用户信息
        dispatch(getUserInfo(json.token))
        dispatch(loginSuccess(json.token))
        //dispatch(showMsg('登录成功,欢迎光临!','success'))
        dispatch(push('/'))
      })
      .catch(err => {
        //登录异常
        if(err && typeof err === 'object' && err.status === 403){
          alert(err.data.error_msg);
        }else{
          console.log('login failure2------:',err)
        }
      })
  }
}

//获取用户信息
export const getUserInfo = (token = getCookie('token')) => {
  return (dispatch, getState) => {
    return api
      .getMe({
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json, status}) => {
        let user = json;
        dispatch({type: 'GET_USERINFO_SUCCESS', user})
      })
      .catch(err => {
        dispatch({type: 'GET_USERINFO_FAILURE'})
      })
  }
}


//获取snslogins
export const getSnsLogins = () => {
  return {
    type: types.GET_SNSLOGINS,
    promise: api.getSnsLogins()
  }
}
//获取验证码
export const getCaptchaUrl = () => {
  return {
    type: types.GET_CAPTCHAURL,
    captchaUrl: API_ROOT + 'users/getCaptcha?' + Math.random()
  }
}

//登录
function loginSuccess(token) {
  return {type: types.LOGIN_SUCCESS, token: token}
}

export function localLogin(userInfo) {
  return (dispatch, getState) => {
    return api
      .localLogin(userInfo)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json, status}) => {
        if (status !== 'OK') {
          dispatch(getCaptchaUrl())
          return dispatch(showMsg(json.data.error_msg || '登录失败'))
        }
        //得到token,并存储
        saveCookie('token', json.token)
        //获取用户信息
        dispatch(getUserInfo(json.token))
        dispatch(loginSuccess(json.token))
        dispatch(showMsg('登录成功,欢迎光临!', 'success'))
        dispatch(push('/'))
      })
      .catch(err => {
        //登录异常
        dispatch(getCaptchaUrl())
        return dispatch(showMsg(err.data.error_msg || '登录失败'))
      })
  }

}

//修改用户资料
function successUpdateUser(user) {
  return {type: types.UPDATE_USER_SUCCESS, user: user}
}
export function updateUser(userInfo) {
  return (dispatch, getState) => {
    return api
      .mdUser(userInfo)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json, status}) => {
        if (status !== 'OK') {
          return dispatch(showMsg(json.data && json.data.error_msg || '更新用户资料失败'))
        }
        return dispatch(getUserInfo())
      })
      .catch(err => {
        return dispatch(showMsg(err.data.error_msg || '更新用户资料失败'))
      })
  }
}
