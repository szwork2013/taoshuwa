'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./book.controller.js');

router.get('/getbook',controller.getbook);
module.exports = router;
