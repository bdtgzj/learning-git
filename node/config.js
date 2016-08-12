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
    '<meta name="author" content="service@ehomeguru.com.cn">',
  ],
  site_logo: '', // default is 'name'
  site_navs: [
    // [ path, title, [target=''] ]
    [ '/about', '关于' ],
  ],
  site_static_host: '', // 静态文件存储域名
  upload_dir: path.join(__dirname, 'public', 'user_data', 'images'),

  // security
  cookieSecret: 'ehomeguru',
  token: 'token',
  tokenId: 'tokenId',
  tokenStatus: 'tokenStatus',

  // mysqld
  mysql: {
    host: '127.0.0.1', // 172.16.5.31
    port: '3306',
    user: 'root',
    password: 'joy2008', // 1qaz2wsx
    database: 'db_jyfs_gd' //
  },

  // mongod
  db: 'mongodb://127.0.0.1/db_ehomeguru',

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
  },

  // Host Info
  hostname: process.env.HOSTNAME || '0.0.0.0',
  port: process.env.PORT || 3000,
  screenHostName: process.env.SCREENHOSTNAME || '0.0.0.0',
  screenHostPort: process.env.SCREENHOSTPORT || 11502,

  // JSON API
  JSONAPI_DESERIALIZER_CONFIG: {
    keyForAttribute: 'camelCase'
  }

};

module.exports = config;
