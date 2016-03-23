'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./book.controller.js');

router.get('/getbook',controller.getbook);
router.get('/',controller.index);
router.get('/do_add',controller.doAdd);
router.get('/add_book',controller.addBook);
router.get('/map',controller.setMap);
router.get('/book_update/:bookID/:posx/:posy',controller.updateBookPos);
module.exports = router;
