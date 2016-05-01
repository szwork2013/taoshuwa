var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//wechat
var config = './lib/config.js'
var OAuth = require('wechat-oauth');
var client = new OAuth(config.wxConfig.wx_appid, config.wxConfig.wx_secret);
var api = require('./token.js');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//// view engine setup

app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/scanQRCodeAuth',function(req,res){
  var url = client.getAuthorizeURL(config.webpath+'/scanQRCode', '', 'snsapi_userinfo');
  res.redirect(url);
})
app.get('/scanQRCode',function(req,res){
  client.getAccessToken(req.query.code, function (err, result) {
    if (result.errcode > 0) {

    } else {
      console.log("getaccesstoken =  ", result);
      var accessToken = result.data.access_token;
      var openid = result.data.openid;
      console.log("accessToken", accessToken);
      var url = config.webpath+'/wechat' + req.originalUrl;
      var param = {
        debug: false,
        jsApiList: "['scanQRCode']",
        url: url.split('#')[0]
      };
      console.log("param", param);
      api.getJsConfig(param, function (err, wxConfig) {
        console.log('wxConfig = ', wxConfig);
        if (err) throw err;
        res.status(200).json({wxConfig: wxConfig})
      });
    }
  });
})

app.use('*',function(req,res,next){
  res.sendfile('./build/index.html');
})
app.listen(5801,function(){
  console.log('build is listening on 5801');
})
