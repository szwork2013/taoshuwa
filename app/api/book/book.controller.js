'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');
var bookModel = require('../../model/book.model.js');

exports.addbook = function (req, res) {
  bookModel.create({name: 'nodejs'}, function (err, result) {
    if (!err) {
      console.log(1);
    } else {
      console.log(2);
    }
  })
}

exports.getbook = function (req, res) {
  let isbn  = req.query.isbn || '9787115281609';
  let isbnUrl = 'https://api.douban.com/v2/book/isbn/'+isbn;
  request.get(isbnUrl, (err,httpResponse,body) => {
    let bookInfo =JSON.parse(body);
    let bookTitle = bookInfo.title;
    let author = bookInfo.author;
    let pubdate = bookInfo.pubdate;
    let image = bookInfo.image;
    let doubanUrl = bookInfo.alt;
    let summary = bookInfo.summary;

    //处理tags
    let tags = [];
    bookInfo.tags.forEach(function(tag){
      tags.push(tag.name);
    });
    bookInfo.tags = tags;
    bookModel.createAsync(bookInfo).then((result)=>{
      return res.send('ok');
    }).catch((err)=>{
      throw err;
      return res.send('error');
    })
  })
}