export const API_ROOT = (process.env.NODE_ENV !== 'production')? 'http://127.0.0.1:5800/':'http://192.168.10.103:5800/';
export const CookieDomain = (process.env.NODE_ENV === 'production')
		? '.taoshuwa.com'
		: ''
