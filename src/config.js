export const API_ROOT = (process.env.NODE_ENV !== 'production')? 'http://42.120.18.176:5800/':'http://192.168.10.104:5800/';
export const CookieDomain = (process.env.NODE_ENV === 'production')
		? '.taoshuwa.com'
		: ''
