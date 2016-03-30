'use strict';

//设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var log4js = require('log4js');
var session = require("express-session");
var path = require('path');
var app = express();
var port = 5800;
var config = require('./app/lib/config');

mongoose.connect(config.mongoConfig.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('now connected')
});

log4js.getLogger("app");
var RedisStore = require('connect-redis')(session);

// view engine setup
app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
app.use(session({
  store: new RedisStore(config.redis),
  secret: config.session.secret,
  rolling: true,
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: config.session.timeout}
}));

require('./app/routes')(app);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  console.log('Error happens:', err);
  res.status(500).send('500 Error');
});

app.listen(port, function () {
  console.log('You are listening at port ', port);
})
