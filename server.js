/**
 * Created by pengjian on 16/3/15.
 */
var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var app = express()
var port = 3000;
mongoose.connect('mongodb://139.162.39.180/taoshuwa');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('now connected');
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.use('/', function (req, res) {
  res.send('i am ok')
})
app.listen(port, function () {
  console.log('You are listening at port ', port)
})