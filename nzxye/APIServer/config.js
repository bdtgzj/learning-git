/**
 * config
 */

var path = require('path');

var debug = true;

var config = {
  name: 'NZXYE',
  description: 'NZXYE-API Server',
  version: '0.1.0',

  debug: debug,

  // security
  clientSecret: 'nzxye_8c',
  serverSalt: 'nzxye_8s',
  token: 'token',
  tokenId: 'tokenId',
  tokenStatus: 'tokenStatus',

  // mongod
  db: 'mongodb://127.0.0.1/db_nzxye',
  // mongoose
  MONGOOSE: {
    AGGREGATE_QUERY_LIMIT: 10000
  },

  //weixin
  weixinToken: 'xuezhile', //joy_bdtgzj

  // email options
  mailOpts: {
    host: 'smtp.ym.163.com',
    port: 994,
    secureConnection: true,
    auth: {
      user: '',
      pass: ''
    }
  },

  // Host Info
  hostname: process.env.HOSTNAME || '0.0.0.0',
  port: process.env.PORT || 3000,

  // JSON API
  JSONAPI_DESERIALIZER_CONFIG: {
    keyForAttribute: 'camelCase'
  }

};

module.exports = config;
