import * as types from '../constants/ActionTypes';
import api from '../api'
import { push } from 'react-router-redux';
import { saveCookie,getCookie, signOut } from '../utils/authService'
import fetch from 'isomorphic-fetch';
import { API_ROOT } from '../config'


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
                dispatch(fetchList(data.books));
            });
    }
}

/*
method: 'post',
     credentials: 'include',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${getCookie('token')}`
     },
     body: JSON.stringify(comment)
 */

export function addBook(book) {
    return function(dispatch, getState) {
        return api.addNewBook(book)
        .then(response => ({json: response.data, status: response.statusText}))
        .then(({json,status}) => {
          if(status !== 'OK'){
            console.log('fetch book info error');
            return false;
          }
          alert('adding success,going back to booklist');
          dispatch(push('/book'))
        }).catch(e=>{
          console.log('addbook error');
        })
    }
}

export function checkOneBook(isbn) {
    return function(dispatch, getState) {
        return fetch(API_ROOT + 'books/fetch_isbn?isbn=' + isbn)
            .then(response => response.json().then(json => ({
                json,
                response
            })))
            .then(({
                json,
                response
            }) => {
                if (!response.ok) {
                    console.log(`查询数据出错:${json.err_msg}`);
                } else {
                    console.log(`json:${json}`);
                    let book = json.book;
                    dispatch({
                        type: types.CHECK_BOOK,
                        book
                    })
                }
            })
            .catch(err => {
                console.log('errrrrrr---:', err);
            })
    }
}

export function delBook(id) {
    return function(dispatch, getState) {
        return fetch(API_ROOT + 'books/delbook?bookid=' + id)
            .then(response => response.json().then(json => ({
                json,
                response
            })))
            .then(({
                json,
                response
            }) => {
                console.log('json-----------:', json);
                console.log('response-----------:', response);
                if (!response.ok) {
                    console.log(`删除数据出错:${json.err_msg}`);
                } else {
                    console.log('why------------------------');
                    dispatch({
                        type: types.DELETE_BOOK,
                        id
                    });
                }
            }).catch(err => {
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

    return(dispatch,getState) =>{
      return api.localLogin(postdata)
      	.then(response => ({json: response.data, status: response.statusText}))
        .then(({json,status}) => {
				if(status !== 'OK'){
					//dispatch(getCaptchaUrl())
					//return dispatch(showMsg(json.data.error_msg || '登录失败'))
					console.log('login failure1');
          return false;
				}
				//得到token,并存储
				saveCookie('token',json.token)
        alert('login success');
				//获取用户信息
				dispatch(getUserInfo(json.token))
				//dispatch(loginSuccess(json.token))
				//dispatch(showMsg('登录成功,欢迎光临!','success'))
				dispatch(push('/'))
			}).catch(err=>{
				//登录异常
        console.log('login failure2');
        return false;
			})
    }
}

//获取用户信息
export const getUserInfo = (token = getCookie('token')) => {
    console.log('-------token-----------fetchData', token);
    return (dispatch, getState) => {
        return api.getMe({
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => ({json: response.data, status: response.statusText}))
            .then(({json,status}) => {
                console.log('getuser----------:', json);
                console.log('status----------:', status);
                let user = json;
                dispatch({
                    type: 'GET_USERINFO_SUCCESS',
                    user
                })
            }).catch(err => {
                console.log('login failure-----------:', err);
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

    return (dispatch, getState) => {
        let getpath = API_ROOT + 'users/me';
        return fetch(getpath, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(user => {
                dispatch({
                    type: 'GET_USERINFO_SUCCESS',
                    user
                })
            }).catch(err => {
                console.log('login failure-----------');
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
