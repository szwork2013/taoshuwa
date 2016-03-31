'use strict';

var mongoose = require('mongoose');
var crypto = require('crypto');
var Promise = require('bluebird');

var userSchema = new mongoose.Schema({
  avatar: String, //头像
  nickname: String, //用户昵称
  phone: String,//用户电话
  pwd: String, //用户密码
  email: { //用户邮箱
    type: String,
    lowercase: true
  },
  icode:String,//邀请码
  age:Number,//用户年龄
  sex:String,//用户性别 m f
  attention:[{//关注类别
    type:String
  }],
  occupation: String,//用户职业
  position:Array,//考虑到用户的多地址 分别用横纵坐标表示具体位置[[120,133],[124,133]]
  address: Array,//考虑到用户的多地址 ['北京市朝阳区东三环北路','海淀区中国人民大学']
  points: { //积分
    type: Number,
    default: 5
  },

  desire_list: [{ //我的心愿单
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],

  like_list: [{ //我的点赞列表
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],

  donate_list:[{ //我的捐出书单
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],

  borrow_list:[{ //我的借书书单
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }],

  message_list:[{ //我的消息列表
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Messsage'
  }],

  created: { //创建时间
    type: Date,
    default: Date.now
  },
  updated: { //更新时间
    type: Date,
    default: Date.now
  }
});
/**
 * Virtuals
 */
/*
UserSchema
  .virtual('userInfo')
  .get(function () {
    return {
      'nickname': this.nickname,
      'role': this.role,
      'email': this.email,
      'avatar': this.avatar,
      'likes': this.likeList,
      'provider': this.provider
    }
  });

UserSchema
  .virtual('providerInfo')
  .get(function () {
    return {
      'qq': this.qq,
      'github': this.github,
      'weibo': this.weibo,
      'facebook': this.facebook,
      'google': this.google,
      'twitter': this.twitter
    }
  });

UserSchema.virtual('token').get(function () {
  return {
    '_id': this._id,
    'role': this.role
  }
})

//nickname如何使用
UserSchema.virtual('nickname').validate(function (value, respond) {
  var self = this;
  this.constructor.find({nickname: value}, function (err, user) {
    if (err) throw err;
    if (user) {
      if (self.id === user.id) {
        return respond(true);
      }
      return respond
      false;
    }
  })
}, '这个昵称已经被使用');

/!**
 * methods
 *!/
UserSchema.methods = {
  hasRole: function (role) {
    var selfRoles = this.role;
    return (selfRoles.indexOf('admin') != -1 || selfRoles.indexOf(role) !== -1);
  }
}*/

var userModel = mongoose.model('User', userSchema);
Promise.promisifyAll(userModel);
Promise.promisifyAll(userModel.prototype);
module.exports = userModel;
