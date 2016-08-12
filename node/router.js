/*!
 * eHomeGuru - route.js
 * Copyright(c) 2016
 */

/**
 * Module dependencies.
 */

var express = require('express');
var user = require('./controllers/user');
var admin = require('./controllers/admin');
var homecard = require('./controllers/homecard');
var region = require('./controllers/region');
var category = require('./controllers/category');
var device = require('./controllers/device');
var scene = require('./controllers/scene');
var instruction = require('./controllers/instruction');
var icon = require('./controllers/icon');
var color = require('./controllers/color');
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
router.post('/region', region.create);
router.put('/region/:id', region.updateOne);
router.delete('/region/:id', region.deleteOne);

/**
 * category
 */
router.get('/category', category.retrieve);
router.post('/category', category.create);
router.put('/category/:id', category.updateOne);
router.delete('/category/:id', category.deleteOne);

/**
 * device
 */
router.get('/device', device.retrieve); //批量查询
//app.get('/device/count', device.count); //特殊查询：对于GET：/zyz/count會被匹配到/zyz/:id，所以需要注意順序
router.get('/device/:id', device.retrieveOne); //唯一查询
router.post('/device', device.create);   //唯一批量创建
router.put('/device/:id', device.updateOne);//唯一更新
//router.put('/device', device.update);//批量更新
router.delete('/device/:id', device.deleteOne); //唯一删除
//router.delete('/device', device.delete); //批量删除

/**
 * scene
 */
router.get('/scene', scene.retrieve);
router.get('/scene/:id', scene.retrieveOne);
router.post('/scene/exec', scene.exec);

/**
 * instruction
 */
router.get('/instruction', instruction.retrieve);
router.post('/instruction/exec', instruction.exec);

/**
 * water.
 */
router.get('/water', water.open);

/**
 * user.
 */
router.post('/user/signin', user.signin);
router.post('/user/:id', user.updateOne);
router.put('/user', user.update);
router.get('/user', user.retrieve);

router.get('/init', user.init);
//signup
router.get('/username_available', user.nameAvailable);
router.get('/email_available', user.emailAvailable);
router.post('/signup', user.signup);
//signin

router.get('/user/is_signin', user.isSignin);
//account relative
router.get('/active_account', user.activeAccount);
router.post('/retrieve_password', user.retrievePassword);
router.get('/reset_password', user.resetPassword);
router.post('/reset_password', user.updatePassword);

/**
 * admin.
 */
router.post('/admin/signin', admin.signin);

/**
 * icon
 */
router.get('/icon', icon.retrieve);
router.post('/icon', icon.create);
router.put('/icon/:id', icon.updateOne);
router.delete('/icon/:id', icon.deleteOne);

/**
 * color
 */
router.get('/color', color.retrieve);
router.post('/color', color.create);
router.put('/color/:id', color.updateOne);
router.delete('/color/:id', color.deleteOne);

module.exports = router;