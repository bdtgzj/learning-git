var nodemailer = require("nodemailer");
var config = require('../config');
var EventProxy = require('eventproxy');

var SITE_ROOT_URL = 'http://' + config.hostname + (config.port !== 80 ? ':' + config.port : '');

var smtpTransport = nodemailer.createTransport('SMTP', config.mailOpts);

var mailEvent = new EventProxy();

var callback = null;

// register event
mailEvent.on("getMail", function(mailOptions) {
  smtpTransport.sendMail(mailOptions, function(err) {
    if (err) {
      // 一旦发生异常，一律交给error事件的handler处理
      return mailEvent.emit('error', err);
    }
    callback(null);
  });
});

var sendMail = function(mailOptions) {
  mailEvent.emit("getMail", mailOptions);
};

// 侦听error事件
mailEvent.bind('error', function (err) {
  // 卸载掉所有handler
  mailEvent.unbind();
  // 异常回调
  callback(err);
});

/**
 * 发送WIFI账号注册成功通知邮件
 * @param {String} username 接收人的姓名、称呼
 * @param {String} mphone 接收人的登录姓名(即手机号)
 * @param {String} userpass 接收人的登录密码
 * @param {String} email 接受人的邮件地址
 */
exports.sendWifiMailCreate = function(username, email, mphone, userpass, cb) {
  callback = cb;
  var from = config.mailOpts.auth.user;
  var to = email;
  var subject = config.name + 'WIFI帐号注册成功';
  var html = '<p>尊敬的' + username + '：</p>' +
    '<p>    您好!</p>' + 
    '<p>我们收到您在' + config.name + '的WIFI账号注册申请信息，以下是您的WIFI账号信息：</p>' +
    '<p>登录姓名：' + mphone + '</p>' +
    '<p>登录密码：' + userpass + '</p>' +
    '<p>若您没有在' + config.name + '申请注册WIFI账号，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉！</p>' + 
    '<p>' + config.name + ' 谨上！</p>';

  sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};

exports.sendWifiMailModify = function(username, email, mphone, userpass, cb) {
  callback = cb;
  var from = config.mailOpts.auth.user;
  var to = email;
  var subject = config.name + 'WIFI帐号密码重置';
  var html = '<p>尊敬的' + username + '：</p>' +
    '<p>    您好!</p>' + 
    '<p>我们收到您在' + config.name + '的WIFI账号密码重置申请，以下是您的最新WIFI账号信息：</p>' +
    '<p>登录姓名：' + mphone + '</p>' +
    '<p>登录密码：' + userpass + '</p>' +
    '<p>若您没有在' + config.name + '申请WIFI账号重置，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉！</p>' + 
    '<p>' + config.name + ' 谨上！</p>';

  sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};

/**
 * 发送激活通知邮件
 * @param {String} who 接收人的邮件地址
 * @param {String} token 重置用的token字符串
 * @param {String} name 接收人的用户名
 * @param {String} email 接受人的邮件地址
 */
exports.sendActiveMail = function(username, email, token) {
  var from = config.mailOpts.auth.user;
  var to = email;
  var subject = config.name + '社区帐号激活';
  var html = '<p>您好：</p>' + 
    '<p>我们收到您在' + config.name + '社区的注册信息，请点击下面的连接来激活账户：</p>' +
    '<a href="' + SITE_ROOT_URL + '/active_account?key=' + token + '&account=' + username + '">激活链接</a>' +
    '<p>若您没有在' + config.name + '社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉！</p>' + 
    '<p>' + config.name + '社区 谨上！';

  sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};

exports.sendResetPassMail = function(username, email, retrievetoken) {
  var from = config.mailOpts.auth.user;
  var to = email;
  var subject = config.name + '社区密码重置';
  var html = '<p>您好：</p>' + 
    '<p>我们收到您在' + config.name + '社区的密码重置请求，请在24小时内点击下面的连接来重置密码：</p>' +
    '<a href="' + SITE_ROOT_URL + '/reset_password?key=' + retrievetoken + '&account=' + username + '">重置密码链接</a>' +
    '<p>若您没有在' + config.name + '社区填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉！</p>' + 
    '<p>' + config.name + '社区 谨上！';

  sendMail({
    from: from,
    to: to,
    subject: subject,
    html: html
  });
};