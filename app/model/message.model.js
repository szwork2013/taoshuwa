'use strict';

let mongoose = require('mongoose');
let Promise = require('bluebird');

let messageSchema = new mongoose.Schema({

  userid:{ //用户ID
    type: mongoose.Schema.Type.ObjectId,
    ref: 'User' //类别表
  },
  content:String, //消息内容
  checked:{ //是否被阅读
    type:Boolean,
    default:false
  },
  create_time:Date.now,//消息生成时间
})

let messageModel = mongoose.model('Message', messageSchema)

Promise.promisifyAll(messageModel);
Promise.promisifyAll(messageModel.prototype);
module.exports = messageModel;