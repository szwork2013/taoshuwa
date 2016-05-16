import * as types from '../constants/ActionTypes';
import api from '../api'
import {push} from 'react-router-redux';
import {saveCookie, getCookie, signOut} from '../utils/authService'
import fetch from 'isomorphic-fetch';
import axios from 'axios'
import {API_ROOT} from '../config'

export function addComment(commObj){
  return dispatch =>{
    api.addNewComment(commObj).then(data=>{
      if(data.status === 200){
        const commentList = data.data.commentList;
        dispatch({
          type:types.COMMENT_LIST,
          commentList
        })
      }
    }).catch(err =>{
      console.log('err-addcomment:',err);
    })
  }
}

export function commentList(bookID){
  return dispatch =>{
    api.getCommentList({
      params:{
        bookid:bookID
      }
    }).then( data =>{
      if(data.status === 200){
        const commentList = data.data.commentList;
        dispatch({
          type:types.COMMENT_LIST,
          commentList
        })
      }
    }).catch(err =>{
      console.log('err-comm-list:',err);
    })
  }
}
