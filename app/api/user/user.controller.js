'use strict';

var User = require('../../model/user.model');
var common = require('../../lib/common');
var bookModel = require('../../model/book.model.js');

//获取用户的捐出的书的列表
exports.getUserList = function (req, res) {
  let userid = req.query._id;
  bookModel.findAsync({
    owner: userid
  }).then((books) => {
    console.log('books:', books);
    res.json({status: 0, books: books});
  }).catch(err => {
    console.log('err:', err);
    res.json({
      status: 1,
      err_msg: '查询用户书籍出错'
    })
  })
}

//添加用户
exports.addUser = function (req, res) {
  var userInfo = {
    avatar: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    nickname: 'pengjian',
    phone: '15281073820',
    pwd: common.md5('123456'),
    address: '朝阳嘉神',
    age: 26,
    sex: 'm',
    points: 5,
  }
  console.log('sessionuser:', req.session.user);
  User.createAsync(userInfo).then(function (user) {
    req.session.user = user;
    return res.json({
      status: 0,
      user: user
    });
  }).catch(function (err) {
    console.log('err:', err);
    return res.send({
      status: 1,
      err_msg: '添加用户出错'
    });
  })
}

//发送验证码
exports.sendSms = function (req, res, next) {
  let phone = req.query.phone;
  //验证手机是否有效
  if (!common.validatemobile(phone)) {
    return res.json({
      status: 1,
      err_msg: '请输入正确的手机号码'
    });
  }

  //判断验证码是否是存在的
  let checkcode = 0;
  if (!req.session.checkcode) {
    checkcode = common.MathRand(6);
  } else {
    checkcode = req.session.checkcode;
  }

  //发送验证码，存入session中
  common.sendSms(phone, content, function (result) {
    if (result.msg === 'ok') {
      req.session.checkcode = checkcode;
      return res.json({
        status: 0,
        checkcode: checkcode
      });
    }
  })
}

//注册 分为两步 第一步验证手机号和密码，第二步填写必要的用户信息 年龄 性别 地址 昵称 关注类别
exports.register_1 = function (req, res, next) {
  let phone = req.body.phone; //注册电话
  let pwd = req.body.pwd; //密码
  let cpwd = req.body.cpwd; //确定密码
  let icode = req.body.icode; //邀请码

  if (pwd !== cpwd) {
    return req.json({
      status: 1,
      err_msg: '密码不一致'
    });
  }
  //pwd ＝ common.md5(pwd);
  //判断该邀请码属于谁 待添加
  User.findAsync({
    icode: icode
  }).then((user) => {
    console.log('usericode:', user);
    //处理提供邀请码的人的积分状态
  }).
  catch((err) => {
    console.log('usererr:', err);
    return res.json({
      status: 2,
      err_msg: '使用邀请码查询用户信息出错'
    });
  })

  User.createAsync({
    phone: phone,
    pwd: pwd
  }).then((user) => {
    return res.json({
      status: 0,
      user: user
    }); //返回客户端进行下一步注册
  }).
  catch((err) => {
    console.log('usererr:', err);
    return res.json({
      status: 3,
      err_msg: '添加用户出错'
    });
  })
};

//注册下一步
exports.register_2 = function (req, res, next) {

  let nickname = req.body.user.nickname;
  let userid = req.body.user._id;
  delete req.body.user._id;

  //判断用户名称是否存在
  User.findOne({nickname: nickname})
    .then((user) => {
      if (user) {
        return res.json({status: 2, err_msg: '用户名存在'});
      }
    }).catch(err => {
  })


  User.updateAsync({_id: userid}, req.body.user)
    .then((user => {
      return res.json({status: 0, user: user});
    }))
    .catch((err) => {
      console.log('updateusererr:', err);
      return res.json({status: 1, err_msg: '更新用户出错'});
    })
};

//登陆 可以使用用户名或者手机号码
exports.login = function (req, res, next) {
  let username = req.query.username;
  let password = req.query.password;
  if (!username || !password) {
    return res.json({
      status: 2,
      err_msg: '用户名或密码不能为空'
    });
  }
  password = common.md5(password);
  User.findOne({$or: [{nickname: username}, {phone: username}]})
    .then(user => {
      if (!user.pwd) {
        return res.json({status: 1, err_msg: '没有该用户'})
      } else {
        if (password === user.pwd) {
          req.session.user = user;
          return res.json({status: 0});
        } else {
          return res.json({status: 3, err_msg: '用户名与密码不一致'});
        }
      }
    }).catch(err => {
    console.log('logixnerr:', err);
    next(err);
  })
}
