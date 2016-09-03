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
var inscat = require('./controllers/inscat');
var family = require('./controllers/family');
var log = require('./controllers/log');
var water = require('./controllers/water');

var router = express.Router();

/**
 * homecard
 */
router.get('/homecard', homecard.retrieve);
router.post('/homecard', homecard.create);
router.put('/homecard/:id', homecard.updateOne);
router.delete('/homecard/:id', homecard.deleteOne);

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
router.post('/scene', scene.create);
router.put('/scene/:id', scene.updateOne);
router.delete('/scene/:id', scene.deleteOne); 
router.post('/scene/exec', scene.exec);

/**
 * instruction
 */
router.get('/instruction', instruction.retrieve);
router.post('/instruction', instruction.create);
router.put('/instruction/:id', instruction.updateOne);
router.delete('/instruction/:id', instruction.deleteOne);
router.post('/instruction/exec', instruction.exec);

/**
 * water.
 */
router.get('/water', water.open);

/**
 * user.
 */
// CRUD
router.get('/user', user.retrieve);
router.post('/user', user.create);
router.put('/user/:id', user.updateOne);
router.delete('/user/:id', user.deleteOne);

router.post('/user/signin', user.signin);
router.post('/user/:id', user.updateOneByMobile);
router.put('/user', user.update);

//signup
router.get('/username_available', user.nameAvailable);
router.get('/email_available', user.emailAvailable);

//account relative
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

/**
 * inscat
 */
router.get('/inscat', inscat.retrieve);
router.post('/inscat', inscat.create);
router.put('/inscat/:id', inscat.updateOne);
router.delete('/inscat/:id', inscat.deleteOne);

/**
 * family
 */
router.get('/family', family.retrieve);
router.post('/family', family.create);
router.put('/family/:id', family.updateOne);
router.delete('/family/:id', family.deleteOne);

/**
 * log
 */
router.get('/log', log.retrieve);
router.post('/log', log.create);
router.put('/log/:id', log.updateOne);
router.delete('/log/:id', log.deleteOne);

module.exports = router;