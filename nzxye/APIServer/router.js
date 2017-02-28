/*!
 * NZXYE - route.js
 * Copyright(c) 2017
 */

/**
 * Module dependencies.
 */

var express = require('express');
var user = require('./controllers/user');
var log = require('./controllers/log');
var customer = require('./controllers/customer');
var checkin = require('./controllers/checkin');

var router = express.Router();

/**
 * simple logger for this router's requests
 * all requests to this router will first hit this middleware
 */
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});


/**
 * device

router.get('/device', device.retrieve); //批量查询
//app.get('/device/count', device.count); //特殊查询：对于GET：/zyz/count會被匹配到/zyz/:id，所以需要注意順序
router.get('/device/:id', device.retrieveOne); //唯一查询
router.post('/device', device.create);   //唯一批量创建
router.put('/device/:id', device.updateOne);//唯一更新
//router.put('/device', device.update);//批量更新
router.delete('/device/:id', device.deleteOne); //唯一删除
//router.delete('/device', device.delete); //批量删除
 */
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

/**
 * log
 */
router.get('/log', log.retrieve);
router.post('/log', log.create);
router.put('/log/:id', log.updateOne);
router.delete('/log/:id', log.deleteOne);

/**
 * customer
 */
router.get('/customer', customer.retrieve);
router.post('/customer', customer.create);
router.put('/customer/:id', customer.updateOne);
router.delete('/customer/:id', customer.deleteOne);

/**
 * checkin
 */
router.get('/checkin', checkin.retrieve);
router.post('/checkin', checkin.create);
router.put('/checkin/:id', checkin.updateOne);
router.delete('/checkin/:id', checkin.deleteOne);

module.exports = router;