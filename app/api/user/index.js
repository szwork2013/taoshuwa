'use strict';

var express = require('express');
var controller = require('./user.controller');
var router = express.Router();

router.get('/user_list',controller.getUserList);
router.get('/user_add',controller.addUser);

module.exports = router;