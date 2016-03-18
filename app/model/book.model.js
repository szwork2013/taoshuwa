'use strict';

let mongoose = require('mongoose');
let Promise = require('bluebird');

let bookSchema = new mongoose.Schema({
  title: String,
  author:String,
  image:String,
  alt:String,
  pubdate:String,
  tags:Array
})

let bookModel = mongoose.model('Book', bookSchema)

Promise.promisifyAll(bookModel);
Promise.promisifyAll(bookModel.prototype);
module.exports = bookModel