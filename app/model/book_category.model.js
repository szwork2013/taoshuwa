'use strict';

let mongoose = require('mongoose');
let Promise = require('bluebird');

let bookCategorySchema = new mongoose.Schema({
  name: String,
})

let bookCategoryModel = mongoose.model('BookCategory', bookCategorySchema)

Promise.promisifyAll(bookCategoryModel);
Promise.promisifyAll(bookCategoryModel.prototype);
module.exports = bookCategoryModel;