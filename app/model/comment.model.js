'use strict';

let mongoose = require('mongoose');
let Promise = require('bluebird');

let commentSchema = new mongoose.Schema({
  bookid: {
    type: mongoose.Schema.Type.ObjectId,
    ref: 'Book'
  },
  userid: {
    type: mongoose.Schema.Type.ObjectId,
    ref: 'User'
  },
  content: String,
  status: { //0删除,1正常(当发表评论之后,默认大家都可以查看,但是管理员拥有删除数据的权限,就是设置评论的status值为0)
    type: Number,
    default: 1
  },
  created: {
    type:Date,
    default:Date.now()
  },

  updated:{
    type:Date,
    default: Date.now()
  }
})

let commentModel = mongoose.model('Book', commentSchema)

Promise.promisifyAll(commentModel);
Promise.promisifyAll(commentModel.prototype);
module.exports = commentModel