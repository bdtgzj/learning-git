/*!
 * xuezhile - route.js
 * Copyright(c) 2014
 */

/**
 * Module dependencies.
 */

var user = require('./controllers/user');
var activity = require('./controllers/activity');
var customer = require('./controllers/customer');
var donation = require('./controllers/donation');
var purchase = require('./controllers/purchase');
var weixin = require('./controllers/weixin');

module.exports = function(app) {
  //activity
  app.get('/api/activity',activity.retrieve);  //批量查询
  app.get('/api/activity/count', activity.count); //特殊查询：对于GET：/zyz/count會被匹配到/zyz/:id，所以需要注意順序
  app.get('/api/activity/:id',activity.retrieveOne); //唯一查询
  app.post('/api/activity', activity.create);   //唯一批量创建
  app.put('/api/activity', activity.update);//唯一批量完全更新
  app.patch('/api/activity', activity.patch);   //唯一批量部分更新
  app.delete('/api/activity', activity.delete); //唯一批量删除
  //customer
  app.get('/api/customer',customer.retrieve);  //批量查询
  app.get('/api/customer/count', customer.count); //特殊查询：对于GET：/zyz/count會被匹配到/zyz/:id，所以需要注意順序
  app.get('/api/customer/name_available', customer.nameAvailable); //特殊查询
  app.get('/api/customer/mphone_available', customer.mphoneAvailable); //特殊查询
  app.get('/api/customer/email_available', customer.emailAvailable); //特殊查询
  app.get('/api/customer/idno_available', customer.idnoAvailable); //特殊查询
  app.get('/api/customer/:id',customer.retrieveOne); //唯一查询
  app.post('/api/customer', customer.create);   //唯一批量创建
  app.put('/api/customer', customer.update);//唯一批量完全更新
  app.patch('/api/customer', customer.patch);   //唯一批量部分更新
  app.delete('/api/customer', customer.delete); //唯一批量删除
  // donation
  app.get('/api/gd',donation.retrieveByNameOrMphone); // 网页功德查询
  app.get('/api/gd/count',donation.retrieveCountByNameOrMphone); // 网页功德查询

  app.get('/api/donation',donation.retrieve);  //批量查询
  app.get('/api/donation/count', donation.count); //特殊查询：对于GET：/zyz/count會被匹配到/zyz/:id，所以需要注意順序
  app.get('/api/donation/sum', donation.sum); //特殊查询
  app.get('/api/donation/:id',donation.retrieveOne); //唯一查询
  app.post('/api/donation', donation.create);   //唯一批量创建
  app.put('/api/donation', donation.update);//唯一批量完全更新
  app.patch('/api/donation', donation.patch);   //唯一批量部分更新
  app.delete('/api/donation', donation.delete); //唯一批量删除
  // purchase
  app.get('/api/purchase',purchase.retrieve);  //批量查询
  app.get('/api/purchase/count', purchase.count); //特殊查询：对于GET：/zyz/count會被匹配到/zyz/:id，所以需要注意順序
  app.get('/api/purchase/sum', purchase.sum); //特殊查询
  app.get('/api/purchase/:id',purchase.retrieveOne); //唯一查询
  app.post('/api/purchase', purchase.create);   //唯一批量创建
  app.put('/api/purchase', purchase.update);//唯一批量完全更新
  app.patch('/api/purchase', purchase.patch);   //唯一批量部分更新
  app.delete('/api/purchase', purchase.delete); //唯一批量删除
  // weixin
  //app.use('/api/weixin', weixin.all()); // 微信功德查询
  /*
  app.get('/api/activity',activity.retrieve);  //批量查询
  app.get('/api/activity/count', activity.count); //对于GET：/zyz/count會被匹配到/zyz/:id，所以需要注意順序
  app.get('/api/activity/mphone_available', activity.mphoneAvailable);
  app.get('/api/activity/email_available', activity.emailAvailable);
  app.get('/api/activity/:id',activity.retrieveOne); //唯一查询
  app.post('/api/activity', activity.create);   //唯一or批量创建
  app.put('/api/activity/:id', activity.update);//唯一更新
  app.patch('/api/activity', activity.patch);   //批量部分更新
  app.delete('/api/activity', activity.delete); //批量删除
  app.patch('/api/activity/wifi/reset_pass', activity.resetPass);
  */
  //user
  app.get('/api/user', user.retrieve);
  app.get('/api/init', user.init);
  //signup
  app.get('/api/username_available', user.nameAvailable);
  app.get('/api/email_available', user.emailAvailable);
  app.post('/api/signup', user.signup);
  //signin
  app.post('/api/user/signin', user.signin);
  app.get('/api/user/is_signin', user.isSignin);
  //account relative
  app.get('/api/active_account', user.activeAccount);
  app.post('/api/retrieve_password', user.retrievePassword);
  app.get('/api/reset_password', user.resetPassword);
  app.post('/api/reset_password', user.updatePassword);
  // topic
  //app.post('/api/topic', topic.create);
  //app.get('/api/topic', topic.retrieve);
  // relation
  //app.post('/api/relation', relation.create);
};