'use strict';

var express = require('express');
var controller = require('./user.controller');
var router = express.Router();

router.get('/user_list',controller.getUserList);
router.get('/user_add',controller.addUser);
router.get('/login_in',controller.login);
router.get('/login_out',controller.loginOut);
router.post('/register',controller.register_1);

module.exports = router;