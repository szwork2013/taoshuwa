'use strict';

var User = require('../../model/user.model');
var common = require('../../lib/common');
var bookModel = require('../../model/book.model.js');

//获取用户的捐出的书的列表
exports.getUserList = function (req, res) {
  let userid = req.query._id;
  bookModel.findAsync({owner:userid}).then((books)=>{
    console.log('books:',books);
    res.json({status:0, books:books});
  }).catch(err => {
      console.log('err:', err);
    res.json({ status:1, err_msg:'查询用户书籍出错'})
  })
}

//添加用户
exports.addUser = function (req, res) {
  var userInfo = {
    avatar:'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    nickname:'pengjian',
    phone:'15281073820',
    pwd:common.md5('123456'),
    address:'朝阳嘉神',
    age:26,
    sex:'m',
    points:5,
  }
  console.log('sessionuser:',req.session.user);
  User.createAsync(userInfo).then(function(user) {
    req.session.user = user;
    return res.json({status:0,user:user});
  }).catch(function (err) {
    console.log('err:',err);
    return res.send({status:1,err_msg:'添加用户出错'});
  })
}
