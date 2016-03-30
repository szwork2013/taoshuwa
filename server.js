'use strict';

//设置默认环境变量
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var port = 5800;

mongoose.connect('mongodb://139.162.39.180/taoshuwa');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('now connected')
});

// view engine setup
app.set('views', path.join(__dirname));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

require('./app/routes')(app);
app.listen(port, function () {
  console.log('You are listening at port ', port);
})