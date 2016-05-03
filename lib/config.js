/**
 * Created by pengjian on 16/3/15.
 */
exports.mongoConfig = {
  url: 'mongodb://139.162.39.180/taoshuwa'
}

exports.wechatConfig = {
  token: 'taoshuwa',
  appid: 'wx67d779246404e369',
  encodingAESKey: 'YbqJgvychkOCURJGXAfjxsegPA65LDvAGC1obtezGCF'
}

exports.redis = {
  prefix: 'taoshuwa:', // session key前缀
  ttl: 3 * 60 * 60 * 1000,
  host: '121.40.204.55',
  port: 6379,
  pass: 'Haoxm!@#1'
};

exports.session = {
  secret: 'taoshuwa',
  timeout: 3 * 60 * 60 * 1000
};

exports.wxConfig = {
  wx_appid:'wx67d779246404e369',
  wx_secret:'08d634a30385b977228cec1b738e16ff'
}

exports.webpath = 'http://42.120.18.176:5801';
