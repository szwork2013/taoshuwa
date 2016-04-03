'use strict';

//设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require("express-session");
var path = require('path');
var app = express();
var port = 5800;
var config = require('./app/lib/config');

//连接mongodb数据库
mongoose.connect(config.mongoConfig.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('now connected')
});

//连接redis数据库
var RedisStore = require('connect-redis')(session);
app.use(session({
  store: new RedisStore(config.redis),
  secret: config.session.secret,
  rolling: true,
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: config.session.timeout}
}));


//设置ejs模板渲染引擎,使用react开发不需要设置该项
app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');

//设置静态文件的目录
app.use(express.static(path.join(__dirname,'public')));
//解析application/x-www-form-urlencoded文件头请求
app.use(bodyParser.urlencoded({extended: false}));
//解析application/json这种json数据格式
app.use(bodyParser.json());
app.use(cookieParser());
//开发日志记录
app.use(logger('dev'));


require('./app/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(port, function () {
  console.log('You are listening at port ', port);
})
