import cookie from 'react-cookie'
import { CookieDomain } from '../config'
let cookieConfig = {}
if(CookieDomain !== ''){
  cookieConfig = { domain: CookieDomain }
}

export function saveCookie(name,value) {
  cookie.save(name, value)
  //cookie.save(name, value, cookieConfig)

}

export function getCookie(name) {
  return cookie.load(name)
}

export function removeCookie(name) {
  cookie.remove(name, cookieConfig)
}

export function signOut() {
  cookie.remove('token', cookieConfig)
}

export function isLogin() {
  return !!cookie.load('token')
}

export function redirectToBack(nextState, replace) {
	//已经登录则不进入
	let pathname = nextState.location.pathname;
  if (isLogin()) {
    if( pathname === '/login'){
      replace('/')
    }
  }
}
export function redirectToLogin(nextState,replace) {
  if (!isLogin()) {
    replace('/login')
  }
}
export function redirectToNow(nextState,replace) {
  const pathnow = nextState.routes[0].path;

  if(isLogin()){
    replace(pathnow);
  }
}
