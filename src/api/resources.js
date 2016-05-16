require('es6-promise').polyfill()
import axios from 'axios'
import { API_ROOT } from '../config'
import { saveCookie, getCookie,signOut} from '../utils/authService'

axios.defaults.baseURL = API_ROOT
axios.defaults.withCredentials = true

// Add a request interceptor
axios.interceptors.request.use(function(config) {
  config.headers = config.headers || {}
  if (getCookie('token')) {
    config.headers.Authorization = 'Bearer ' + getCookie('token').replace(/(^\")|(\"$)/g, "")
  }
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function(response) {
  if (response.status === 401) {
    //signOut()
    window.location.pathname = '/login'
  }
  return response
}, function(error) {
  // Do something with response error
  return Promise.reject(error)
})


/*
 * add for taoshuwa
 */
export const BookResource = (method, id, data, api = 'books') => {
  // BookResource('get','fetchone',data)
  return axios[method](api + (id ? ('/' + id) : ''), data)
}


export const UserResource = (method, id, data, api = 'users') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const AuthResource = (method, id, data, api = 'auth') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

//类别
export const CategoryResource = (method, id, data, api = 'category') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

//漂流
export const DriftResource = (method, id, data, api = 'drift') => {
    return axios[method](api + (id ? ('/' + id) : ''), data)
}

//微信相关
export const WechatResource = (method, id, data, api = 'wechat') => {
    return axios[method](api + (id ? ('/' + id) : ''), data)
}

//评论相关
export const CommentResource = (method, id, controller, data, api = 'comment') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}

export const ArticleResource = (method, id, controller, data, api = 'article') => {
  return axios[method](api + (id ? ('/' + id) : '') + (controller ? ('/' + controller) : ''), data)
}
export const TagResource = (method, id, data, api = 'tags') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}
export const MobileResource = (method, id, data, api = 'mobile') => {
  return axios[method](api + (id ? ('/' + id) : ''), data)
}
