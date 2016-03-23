'use strict';

var express = require('express');
var controller = require('./wechat.controller');
var router = express.Router();

router.use('/',controller.wechat);

module.exports = router;