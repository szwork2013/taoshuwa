'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var Promise = require('bluebird');

var UserSchema = new Schema({
  avatar: String,
  nickname: String,
  phone: String,
  pwd: String,
  address: String,
  email: {
    type: String,
    lowercase: true
  },
  occupation: String,
  position:Array,//分别用横纵坐标表示具体位置
  points: {
    type: Number,
    default: 5
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },


  provider: {
    type: String,
    default: 'local'
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  github: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  weibo: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  qq: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  likeList: [{
    type: Schema.Types.ObjectId,
    ref: 'Article'
  }],
  hashedPassword: String,
  salt: String,
  role: {
    type: String,
    default: 'user'
  },

  status: {
    type: Number,
    default: 0
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

var User = mongoose.model('User', UserSchema);
Promise.promisifyAll(User);
Promise.promisifyAll(User.prototype);
module.exports = User;
