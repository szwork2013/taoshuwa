'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');
var bookModel = require('../../model/book.model.js');

exports.addBook = function (req, res) {
  res.render('add_book');
}

exports.index = function(req,res){
  bookModel.findAsync().then(function(bookList){
    res.render('index',{bookList:bookList});
  }).catch(function(err){
    throw err;
    return res.send('出错了');
  })
}

exports.doAdd = function(req,res){
  let isbn  = req.query.isbn || '9787115281609';
  let isbnUrl = 'https://api.douban.com/v2/book/isbn/'+isbn;
  request.get(isbnUrl, (err,httpResponse,body) => {

    if(err) throw err;
    let bookInfo =JSON.parse(body);
    if(bookInfo.msg == 'book_not_found') return res.send('找不到这本书,是不是isbn输入出错');
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
      return res.send('添加成功');
    }).catch((err)=>{
      throw err;
      return res.send('error');
    })
  })
}

exports.fetchBookList = function(req,res){
  return bookModel.findAsync().then(function(bookList){
    console.log('book-----------------',bookList);
    return bookList;
  }).catch(function(err){
    throw err;
    return res.send('出错了');
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

exports.setMap = function(req,res){
  var id = req.query.id;
  res.render('map',{bookID:id});
}

exports.updateBookPos = function(req,res){
  var url = req.url;
  var posX = req.params.posx;
  var posY = req.params.posy;
  var bookID = req.params.bookID;

  console.log('req.params: ',req.params);
  bookModel.updateAsync({_id:bookID},{position:[posX,posY]}).then(function(results){
    console.log('results:',results);
    res.send('success');
  }).catch(function(err){
    console.log('err:',err);
    res.send('error:',err);
  })
}