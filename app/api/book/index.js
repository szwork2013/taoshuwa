'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./book.controller.js');

router.get('/fetch_isbn',controller.fetchISBN);//根据isbn查询书籍的信息
router.get('/fetchone', controller.fetchOne);//根据图书在数据库中的唯一编号查询书籍信息
router.get('/',controller.index);//获取图书列表
router.get('/add_book',controller.addBook); //添加某一本具体的书籍
router.get('/add_desire',controller.addDesiredBook);//将某一本书加入心愿单
router.get('/fetch_desire_list',controller.fetchDesiredBooks);//获取用户的心愿单
router.get('/map',controller.setMap);
router.get('/book_update/:bookID/:posx/:posy',controller.updateBookPos);
router.get('/delbook',controller.delbook);
module.exports = router;
