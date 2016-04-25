import * as types from '../constants/ActionTypes';
import api from '../api'
import {push} from 'react-router-redux';
import {saveCookie, getCookie, signOut} from '../utils/authService'
import fetch from 'isomorphic-fetch';
import {API_ROOT} from '../config'

export function fetchOneBook(id) {
  return function(dispatch, getState) {
    return api
      .fetchOneBook({
      params: {
        _id: id
      }
    })
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json, status}) => {
        if (status === 'OK') {
          let curbook = json.book;
          console.log('curbook--------------:', curbook);
          dispatch({type: types.FETCH_ONE_BOOK, curbook})
        }
      })
      .catch(err => {
        console.log('err-----------:', err);
      })
  }
}

export function fetchLoanBookList() {
  return function(dispatch, getState) {
    api
      .fetchLoanBookList()
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json, status}) => {
        if (status !== 'OK') {
          console.log('fetch book info error');
          return false;
        }
        dispatch({type: types.LOAN_BOOK_LIST, loanlist: json.loanlist});
      })
      .catch(e => {
        console.log('fetchLoanBookList error');
      })
  }
}

export function fetchBooks() {
  return function(dispatch, getState) {
    return fetch(API_ROOT + 'books')
      .then(response => response.json())
      .then(data => {
        dispatch({type: types.BOOK_LIST, books: data.books})
      });
  }
}

export function addBook(book) {
  return function(dispatch, getState) {
    return api
      .addNewBook(book)
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json, status}) => {
        if (status !== 'OK') {
          console.log('fetch book info error');
          return false;
        }
        alert('添加书籍成功');
        console.log('jsonbook--------------:', json.book);
        dispatch({type: types.BOOK_LIST, books: json.book})
        dispatch(push('/'))
      })
      .catch(err => {
        if (err && typeof err === 'object' && err.status === 401) {
          //没有登录
          alert('你没有登录不能添加书籍');
          dispatch(push('/login'));
        } else {
          console.log('err----:', err)
        }
      })
  }
}

export function checkOneBook(isbn) {
  return function(dispatch, getState) {
    return fetch(API_ROOT + 'books/fetch_isbn?isbn=' + isbn)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          console.log(`查询数据出错:${json.err_msg}`);
          alert(json.err_msg);
        } else {
          console.log(`json:${json}`);
          let book = json.book;
          dispatch({type: types.CHECK_BOOK, book})
        }
      })
      .catch(err => {
        console.log('errrrrrr---:', err);
      })
  }
}

export function borrowBook(bookid, duration) {
  return dispatch => {
    return api
      .createRequest({
        params: {
          bookid,
          duration
        }
      })
      .then(function(data) {
        console.log('data------------:', data);
      })
      .catch(err => {
        console.log('errrrrrr---:', err);
      })
  }
}

export function delBook(id) {
  return function(dispatch, getState) {
    return fetch(API_ROOT + 'books/delbook?bookid=' + id)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (!response.ok) {
          console.log(`删除数据出错:${json.err_msg}`);
        } else {
          dispatch({type: types.DELETE_BOOK, id});
        }
      })
      .catch(err => {
        console.log(`delerr:${err}`);
      })
  }
}
