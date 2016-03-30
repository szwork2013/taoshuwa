'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');
var bookModel = require('../../model/book.model.js');
var User = require('../../model/user.model');

exports.index = function(req, res) {
  bookModel.findAsync().then(function(bookList) {
    res.render('index', {
      bookList: bookList
    });
  }).catch(function(err) {
    throw err;
    return res.send('出错了');
  })
}


//获取用户的捐出的书的列表
exports.getUserList = function(req, res) {
  let userid = req.query._id;
  bookModel.findAsync({
    owner: userid
  }).then((books) => {
    console.log('books:', books);
    res.json({
      status: 0,
      books: books
    });
  }).catch(err => {
    console.log('err:', err);
    res.json({
      status: 1,
      err_msg: '查询用户书籍出错'
    })
  })
}

//将某一本书加入心愿单
exports.addDesiredBook = function(req, res, next) {
  let user = req.session.user;
  if (!user) {
    return res.json({
      status: 1,
      err_msg: '用户不存在'
    });
  }
  let bookid = req.query.bookid;
  if (!bookid) return req.json({
    status: 2,
    err_msg: '需要传入书籍信息'
  });
  let userid = req.session.user._id;

  User.updateAsync({
    _id: userid
  }, {
    $push: {
      desire_list: bookid
    }
  }).then((user) => {
    return res.json({
      status: 0
    })
  }).catch(err => {
    console.log('err----------:', err);
    return res.json({
      status: 1,
      err_msg: '加入心愿单出现错误'
    });
  })
}

//获取当前用户的心愿单列表
exports.fetchDesiredBooks = function(req, res, next) {
  let user = req.session.user;
  if (!user) {
    return res.json({
      status: 1,
      err_msg: '用户不存在'
    });
  }
  let userid = req.session.user._id;
  User.findOne({
    _id: userid
  }).populate('desire_list').exec().then( user =>{
    console.log('心愿单中的数量：',user.desire_list.length )
    res.json({status:0,user:user})
  } ).catch(err =>{
    res.json({status:1, err_msg:err});
  })
}


//获取用户借书订单
exports.fetchBorrowBooks = function(req, res, next) {
  let userid = req.query._id;

}

//获取附近的书籍
exports.fetchNearBooks = function(req, res, next) {
  let userid = req.query._id;
}

//获取所有的书籍
exports.fetchAllBooks = function(req, res) {
  return bookModel.findAsync().then(function(bookList) {
    return bookList;
  }).catch(function(err) {
    throw err;
    return res.send('出错了');
  })
}

exports.fetchOne = function(req, res, next) {
  let _id = req.query._id;
  bookModel.findOneAsync({
    _id: _id
  }).then(function(result) {
    return res.json({
      status: 0,
      book: result
    })
  }).catch(function(err) {
    throw err;
  })
};

exports.fetchISBN = function(req, res, next) {
  var isbn = req.query.isbn;
  if (isbn && isbn != 'undefined' && isbn != '') {
    let isbnUrl = 'https://api.douban.com/v2/book/isbn/' + isbn;
    request.get(isbnUrl, (err, httpResponse, body) => {
      if (err) throw err;
      let bookInfo = JSON.parse(body);
      if (bookInfo.msg == 'book_not_found') {
        return res.json({
          status: 2,
          err_msg: '找不到这本书,是不是isbn输入出错'
        });
      }
      return res.json({
        status: 0,
        book: bookInfo
      });
    })
  } else {
    return res.json({
      status: 1,
      err_msg: 'isbn不能为空'
    });
  }
}

exports.addBook = function(req, res) {
  //let book = req.body.book;

  let user = req.session.user;
  if (!user) {
    return res.json({
      status: 2,
      err_msg: '用户不存在'
    });
  }

  let _id = req.session.user._id;
  let book = {
    title: '天才在左1234455',
    author: 'hapiman', //作者
    image: '', //封面图片
    alt: '', //豆瓣链接
    content: ' 我是内容', //内容介绍
    pubdate: '2014-1-1', //出版日期
    position: [0, 0], //经纬位置如 [116.408392,39.933545]
    address: '北京海淀', //详细地址如 北京市东三环北路甲19号嘉盛中心
    tags: ['编程', '设计', '开发'], //标签如 [编程,设计,开发]
    isbn: '123456789', //isbn编码
    owner: req.session.user._id
  }

  bookModel.createAsync(book).then((result) => {
    return res.json({
      status: 0,
      book: result
    })
  }).catch((err) => {
    console.log('err:', err);
    return res.json({
      status: 1,
      err_msg: '添加书籍出错'
    });
  })
}

exports.fetchUsersBook = function(req, res, next) {
  let userid = req.query._id;
  bookModel.findAsync({
    owner: userid
  }).then((books) => {
    console.log('books:', books);
    res.json({
      status: 0,
      books: books
    });
  }).catch(err => {
    console.log('err:', err);
    res.json({
      status: 1,
      err_msg: '查询用户书籍出错'
    })
  })
}

exports.getbook = function(req, res) {
  let isbn = req.query.isbn || '9787115281609';
  let isbnUrl = 'https://api.douban.com/v2/book/isbn/' + isbn;
  request.get(isbnUrl, (err, httpResponse, body) => {
    let bookInfo = JSON.parse(body);
    let bookTitle = bookInfo.title;
    let author = bookInfo.author;
    let pubdate = bookInfo.pubdate;
    let image = bookInfo.image;
    let doubanUrl = bookInfo.alt;
    let summary = bookInfo.summary;

    //处理tags
    let tags = [];
    bookInfo.tags.forEach(function(tag) {
      tags.push(tag.name);
    });
    bookInfo.tags = tags;
    bookModel.createAsync(bookInfo).then((result) => {
      return res.send('ok');
    }).catch((err) => {
      throw err;
      return res.send('error');
    })
  })
}

exports.setMap = function(req, res) {
  var id = req.query.id;
  res.render('map', {
    bookID: id
  });
}

exports.updateBookPos = function(req, res) {
  var url = req.url;
  var posX = req.params.posx;
  var posY = req.params.posy;
  var bookID = req.params.bookID;

  console.log('req.params: ', req.params);
  bookModel.updateAsync({
    _id: bookID
  }, {
    position: [posX, posY]
  }).then(function(results) {
    console.log('results:', results);
    res.send('success');
  }).catch(function(err) {
    console.log('err:', err);
    res.send('error:', err);
  })
}
