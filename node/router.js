/*!
 * eHomeGuru - route.js
 * Copyright(c) 2016
 */

/**
 * Module dependencies.
 */

var express = require('express');
var user = require('./controllers/user');
var water = require('./controllers/water');

var router = express.Router();

/**
 * water.
 */
 router.get('/water', water.open);

/**
 * user.
 */
router.get('/api/user', user.retrieve);
router.get('/api/init', user.init);
//signup
router.get('/api/username_available', user.nameAvailable);
router.get('/api/email_available', user.emailAvailable);
router.post('/api/signup', user.signup);
//signin
router.post('/api/user/signin', user.signin);
router.get('/api/user/is_signin', user.isSignin);
//account relative
router.get('/api/active_account', user.activeAccount);
router.post('/api/retrieve_password', user.retrievePassword);
router.get('/api/reset_password', user.resetPassword);
router.post('/api/reset_password', user.updatePassword);
// topic
//app.post('/api/topic', topic.create);
//app.get('/api/topic', topic.retrieve);
// relation
//app.post('/api/relation', relation.create);
module.exports = router;