import * as types from '../constants/ActionTypes';
import {
  push
} from 'react-router-redux';
import {
  saveCookie,
  getCookie,
  signOut
} from '../utils/authService'
import fetch from 'isomorphic-fetch';
import {
  API_ROOT
} from '../config'


export function addFriend(name) {
  return {
    type: types.ADD_FRIEND,
    name
  };
}

export function deleteFriend(id) {
  return {
    type: types.DELETE_FRIEND,
    id
  };
}

export function starFriend(id) {
  return {
    type: types.STAR_FRIEND,
    id
  };
}

function fetchList(books) {
  console.log()
  return {
    type: types.BOOK_LIST,
    books
  }
}


export function fetchBooks() {
  return function(dispatch, getState) {
    return fetch(API_ROOT + 'books')
      .then(response => response.json())
      .then(data => {
        console.log('data-------:', data);
        dispatch(fetchList(data.books));
      });
  }
}

export function addBook(book) {
  return function(dispatch, getState) {
    let token = getCookie('token');
    //token = undefined;
    return fetch(API_ROOT + 'books/add_book?access_token='+token,{
      method:'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    }).then( xx =>{
      console.log('xx--------------:',xx);
    } ).then(response => response.json().then(json => ({ json, response })))
      .then(({json,response}) => {
        console.log('json--------------:',json);
        console.log('response------------:',response);
        if(!response.ok){
          console.log(`查询数据出错:${json.err_msg}`);
        }else{
          dispatch({
            type: types.ADD_BOOK,
            json
          })
        }
      })
    }
}

export function checkOneBook(isbn) {
  return function(dispatch, getState) {
    return fetch(API_ROOT + 'books/fetch_isbn?isbn=' + isbn)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({json,response}) => {
      if(!response.ok){
        console.log(`查询数据出错:${json.err_msg}`);
	  	}else{
        console.log(`json:${json}`);
        let book = json.book;
        dispatch({
          type:types.CHECK_BOOK,
          book
        })
      }
    })
    .catch(err => {
      console.log('errrrrrr---:',err);
    })
  }
}

export function delBook(id) {
  return function(dispatch, getState) {
    return fetch(API_ROOT + 'books/delbook?bookid=' + id)
      .then(response => response.json().then(json => ({ json, response })))
      .then(({json,response}) => {
        console.log('json-----------:',json);
        console.log('response-----------:',response);
        if(!response.ok){
            console.log(`删除数据出错:${json.err_msg}`);
        }else{
          console.log('why------------------------');
          dispatch({ type: types.DELETE_BOOK, id });
        }
      }).catch(err =>{
        console.log(`delerr:${err}`);
      })
  }
}

//user
export function loginIn(username, password) {
  var postdata = {
    username: '15281073821',
    password: '123456'
  }
  return (dispatch, getState) => {
    return fetch(API_ROOT + 'auth/local', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postdata)
      })
      .then(response => response.json().then(json => ({
        json,
        response
      })))
      .then(({
        json,
        response
      }) => {
        console.log('json:', json);
        console.log('response:', response);
        if (!response.ok) {
          console.log('false');
        }
        console.log('true');
        //得到token,并存储
        saveCookie('token', json.token)
          //获取用户信息
          //dispatch(getUserInfo(json.token))
          //dispatch(loginSuccess(json.token))
          //dispatch(pushPath('/'))
      }).catch(err => {
        //登录异常
        //return dispatch(loginFailure(err))
      })
  }
}

//获取用户信息
export const getUserInfo = (token = getCookie('token')) => {
  console.log('-------token-----------fetchData', token);
  return (dispatch, getState) => {
    let getpath = API_ROOT + 'users/me';
    console.log('getpath----:', getpath);
    return fetch(getpath, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then( response => {
        if(response.status === 401){
          //强行跳转到登录界面，实际上该功能能够在中间件上处理
          let localname = window.location.pathname;
          console.log('localname:',localname);
      
          if(localname != '/book' && localname != '/login' ){
            window.location.pathname = '/login'
          }
        }else{
          return response.json();
        }
      } )
      .then(user => {
        dispatch({
          type: 'GET_USERINFO_SUCCESS',
          user
        })
      }).catch(err => {

      })
  }

  return {
    type: types.GET_USERINFO,
    promise: api.getMe({
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}

export function loginOut() {
  return function(dispatch, getState) {
    return fetch(API_ROOT + 'delbook?bookid=' + id)
      .then(response => response.json())
      .then(data => {
        dispatch(deleteBook(id));
      });
  }
}

export function register(phone, password, cpassword) {
  return function(dispatch, getState) {
    return fetch(API_ROOT + 'users/register', {
        method: 'post',
        body: {
          phone: phone,
          pwd: password,
          cpwd: cpassword
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('data:', data.username);
        if (data.status === 0) {
          dispatch({
            type: types.REGISTER,
            username: data.username
          });
        } else {
          alert(data.err_msg);
        }
      });
  }
}
