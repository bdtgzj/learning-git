/*!
 * eHomeGuru - route.js
 * Copyright(c) 2016
 */

/**
 * Module dependencies.
 */

var express = require('express');
var user = require('./controllers/user');
var homecard = require('./controllers/homecard');
var region = require('./controllers/region');
var water = require('./controllers/water');

var router = express.Router();

/**
 * homecard
 */
 router.get('/homecard', homecard.retrieve);

 /**
 * region
 */
 router.get('/region', region.retrieve);

/**
 * water.
 */
 router.get('/water', water.open);

/**
 * user.
 */
router.get('/user', user.retrieve);
router.get('/init', user.init);
//signup
router.get('/username_available', user.nameAvailable);
router.get('/email_available', user.emailAvailable);
router.post('/signup', user.signup);
//signin
router.post('/user/signin', user.signin);
router.get('/user/is_signin', user.isSignin);
//account relative
router.get('/active_account', user.activeAccount);
router.post('/retrieve_password', user.retrievePassword);
router.get('/reset_password', user.resetPassword);
router.post('/reset_password', user.updatePassword);
// topic
//app.post('/api/topic', topic.create);
//app.get('/api/topic', topic.retrieve);
// relation
//app.post('/api/relation', relation.create);
module.exports = router;