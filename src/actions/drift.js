import * as types from '../constants/ActionTypes';
import api from '../api'
import {push} from 'react-router-redux';
import {saveCookie, getCookie, signOut} from '../utils/authService'
import fetch from 'isomorphic-fetch';
import {API_ROOT} from '../config'


export function checkBookStatus(bookid){
  return dispatch =>{
    return api.checkBookStatus({
      params:{
        bookid:bookid
      }
    }).then( data => {
      dispatch({
        type:types.BOOK_STATUS,
        bookstatus:data.data
      })
    }).catch( err => {
      if(err && err.status === 401){
        //dispatch(push('/login'))
      }
    })
  }
}

export function dealMessage(messageID, dealtype, bookid){
  return dispatch =>{
    api.dealRequest({
      params:{
        driftid:messageID,
        dealtype:dealtype,
        bookid
      }
    }).then( data =>{
      if(data.status === 200){
        dispatch({
          type:types.MESSAGE_LIST,
          messagelist: data.data.messagelist
        })
      }
      alert('请求处理成功');
    }).catch(err =>{
      console.log('err-----------:',err);
    })
  }
}

export function messageList(){
  return dispatch => {
    api.messageList()
      .then( data =>{
        if(data.status === 200){
          dispatch({
            type:types.MESSAGE_LIST,
            messagelist: data.data.messagelist
          })
        }
      }).catch(err => {
        console.log('err-----------:',err);
      })
  }
}

export function borrowList(){
  return dispatch =>{
    api.borrowList()
    .then(data => {
      if(data.status === 200){
        const borrowlist = data.data.borrowList;
        dispatch({
          type:types.BORROW_LIST,
          borrowlist
        })
      }
    })
    .catch(err => {
      console.log('borrowList:',err);
    })
  }
}

export function desireList(){
  return dispatch =>{
    api.desireList()
    .then(data => {
      if(data.status === 200){
        const desirelist = data.data.desireList;
        dispatch({
          type:types.DESIRE_LIST,
          desirelist
        })
      }
    })
    .catch(err => {
      console.log('desireList:',err);
    })
  }
}

export function finishReading(data){
  return dispatch=>{
    api.finishReading(data)
    .then(data =>{
      if(data.status === 200){
        console.log('data---:',data);
        const borrowlist = data.data.borrowList;
        dispatch({
          type:types.BORROW_LIST,
          borrowlist
        })
      }
    }).catch(err => {
      console.log('finishReading:',err);
    })
  }
}

export function addDesire(bookid){
  return dispatch => {
    api.addDesire({
      params:{
        bookid
      }
    }).then( data => {
      if(data.status === 200){
        alert('添加成功');
      }else if(data.status === 403){
        alert(data.data.err_msg)
      }
    }).catch( err =>{
      if(err && err.status === 403){
        alert(err.data.err_msg);
      }
      console.log('err ---------------:',err);
    })
  }
}
