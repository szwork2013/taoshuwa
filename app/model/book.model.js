'use strict';

let mongoose = require('mongoose');
let Promise = require('bluebird');

let bookSchema = new mongoose.Schema({
  //基础信息
  title: String,//书籍名称
  author: String,//作者
  image: String,//封面图片
  alt: String,//豆瓣链接
  content:String,//内容介绍
  pubdate: String,//出版日期
  position: Array,//经纬位置如 [116.408392,39.933545]
  address: String,//详细地址如 北京市东三环北路甲19号嘉盛中心
  tags: Array,//标签如 [编程,设计,开发]
  isbn:String,//isbn编码
  source: {
    type: Number,//书的来源,目前是两类,分别来自平台和用户捐书
    default: 0 //0代表来自平台,1代表来自用户捐书,默认设置为0
  },
  owner: { //书的所有人,平台的书的所有人都是'淘书娃',用户捐献的书所有者为用户,但是第一版本在界面上显示所有者都为'淘书娃'
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' //类别表
  },
  category: { //书的大类别如 计算机与互联网 文学等
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookCategory' //类别表
  },

  //状态信息
  saying: {//捐书者说的话,如果为空,则内容为默认设置
    type: String,
    default: '愿意为你效劳'
  },
  visit_count: {//访问数
    type: Number,
    default: 1
  },

  loantimes: { //成功借出次数
    type: Number,
    default: 0
  },

  comment_count: {//评论书
    type: Number,
    default: 0
  },

  like_count: { //点赞数或者喜欢数量
    type: Number,
    default: 1
  },

  status: { //当前书的状态,标示访客看到的书的状态 可借,借出,申请中
    type: Number,
    default: 0
  },

  created: { //上架时间
    type: Date,
    default: Date.now
  },

  updated: { //更新时间
    type: Date,
    default: Date.now
  },

  opend: { //判断上传的书是否可见,默认是可见的.主要是针对平台书的管理,在获取书的列表时判断该信息
    type: Boolean,
    default: true
  }

})

let bookModel = mongoose.model('Book', bookSchema)

Promise.promisifyAll(bookModel);
Promise.promisifyAll(bookModel.prototype);
module.exports = bookModel
