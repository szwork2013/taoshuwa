'use strict';

var User = require('../../model/user.model');
var common = require('../../lib/common');

exports.getUserList = function (req, res) {
  User.findAsync({}).then(function (user) {
    return res.status(200).json({msg: 'ok', user: user});
  }).catch(function (err) {
    return res.status(500).send(err);
  })
}

exports.addUser = function (req, res) {
  var userInfo = {
    avatar:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    nickname:'pengjian',
    phone:'15281073820',
    pwd:common.md5('123456'),
    address:'朝阳嘉神',
    points:10,
  }
  User.createAsync(userInfo).then(function (result) {
    return res.status(200).json({msg: 'ok'});
  }).catch(function (err) {
    return res.status(500).send(err);
  })
}