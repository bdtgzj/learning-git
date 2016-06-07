/**
 * config
 */

var path = require('path');

var debug = true;

var config = {
  name: '易家智',
  description: '易家智',
  version: '0.1.0',

  debug: debug,

  // site settings
  site_metas: [
    '<meta name="keywords" content="易家智">',
    '<meta name="author" content="service@xuezhile.cn">',
  ],
  site_logo: '', // default is 'name'
  site_navs: [
    // [ path, title, [target=''] ]
    [ '/about', '关于' ],
  ],
  site_static_host: '', // 静态文件存储域名
  upload_dir: path.join(__dirname, 'public', 'user_data', 'images'),

  cookieSecret: 'ehomeguru',
  token: 'token',
  tokenId: 'tokenId',
  tokenStatus: 'tokenStatus',

    /*
  mysql: {
    host: 'sqld.duapp.com',
    port: '4050',
    user: 'zRzmPmhC4KV7t9gDzATQoEkS',
    password: 'IGApgf97oKG5yuy2dvferma70d8DZPGy',
    database: 'OskyCstjfIIpyPnkvUYw'
  },
  */
  mysql: {
    host: '127.0.0.1', // 172.16.5.31
    port: '3306',
    user: 'root',
    password: 'joy2008', // 1qaz2wsx
    database: 'db_jyfs_gd' //
  },

  //db: 'mongodb://zRzmPmhC4KV7t9gDzATQoEkS:IGApgf97oKG5yuy2dvferma70d8DZPGy@mongo.duapp.com:8908/FdirTQHYpEulyHiMValI',
  db: 'mongodb://127.0.0.1/db_xuezhile',
  hostname: process.env.HOSTNAME || '0.0.0.0',
  port: process.env.PORT || 1337,

  //weixin
  weixinToken: 'xuezhile', //joy_bdtgzj

  // email options
  mailOpts: {
    host: 'smtp.ym.163.com',
    port: 994,
    secureConnection: true,
    auth: {
      user: 'service@xuezhile.cn',
      pass: '7Cov6IC9rm'
    }
  },
  // sms
  sms: {
    cdkey: 'XXX',
    password: 'XXX',
    host: '.cn',
    port: '8080',
    path: {
      register: '/sdkproxy/regist.action',
      unregister: '/sdkproxy/logout.action',
      realtime: '/sdkproxy/sendsms.action',
      timing: '/sdkproxy/sendtimesms.action',
      balance: '/sdkproxy/querybalance.action',
      report: '/sdkproxy/getreport.action'
    }
  }
};

module.exports = config;
