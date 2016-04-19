import * as types from '../constants/ActionTypes';
import api from '../api'
import {push} from 'react-router-redux';
import {saveCookie, getCookie, signOut} from '../utils/authService'
import fetch from 'isomorphic-fetch';
import {API_ROOT} from '../config'


export function chooseCategory(index){
  return {
    type: types.CHOOSE_CATEGORY,
    index
  }
}

export function fetchCategoryWithUser(){
  return function(dispatch, getState){
    return api.fetchCategoryWithUser()
      .then(response => ({json: response.data, status: response.statusText}))
      .then(({json, status}) => {
        const categories  = json.categories;
        dispatch({
          type:types.USER_CATEGORY,
          categories
        })
      })
  }
}
