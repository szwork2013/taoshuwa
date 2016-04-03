import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';


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

function deleteBook(id){
  return {
    type: types.DELETE_BOOK,
    id
  }
}

export function fetchBooks() {
  return function (dispatch, getState) {
    return fetch('http://localhost:5800/')
      .then(response => response.json())
      .then(data => {
        dispatch(fetchList(data.books));
      });
  }
}

export function addBook(book) {
  return {
    type: types.ADD_BOOK,
    book
  };
}

export function delBook(id) {
  return function (dispatch, getState) {
    return fetch('http://localhost:5800/delbook?bookid='+id)
      .then(response => response.json())
      .then(data => {
        dispatch(deleteBook(id));
      });
  }
}

//user
export function loginIn(username,password){
  return function (dispatch, getState) {
    return fetch('http://localhost:5800/users/login_in?username='+username+'&password='+password)
      .then(response => response.json())
      .then(data => {
        if(data.status === 0){
          dispatch({
            type:types.LOGIN
          });
        }else{
          alert(data.err_msg);
        }
      });
  }
}

export function loginOut(){
  return function (dispatch, getState) {
    return fetch('http://localhost:5800/delbook?bookid='+id)
      .then(response => response.json())
      .then(data => {
        dispatch(deleteBook(id));
      });
  }
}

export function register(phone,password,cpassword){
  phone = '15281073820';
  password = '123456';
  cpassword = '123456';
  console.log('post will go ');
  return function (dispatch, getState) {
    return fetch('http://localhost:5800/users/register', {method:'post', body:{phone:phone, pwd:password,cpwd:cpassword}})
      .then(response => response.json())
      .then(data => {
        console.log('data:',data);
        if(data.status === 0){
          dispatch({
            type:types.LOGIN
          });
        }else{
          alert(data.err_msg);
        }
      });
  }
}