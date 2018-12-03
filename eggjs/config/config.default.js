// Cookie 安全字符串
exports.keys = 'egg';

exports.view = {
  defaultViewEngine: 'nunjacks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};

exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};

exports.stocks = {
  serverUrl: 'http://api.tushare.pro'
};

// mount middleware
exports.middleware = [
  'robot'
];

// middle config
exports.robot = {
  ua: [
    /Baiduspider/i,
  ]
};

// mongoose
exports.mongoose = {
  client: {
    url: 'mongodb://127.0.0.1/db_eggjs',
    options: {}
  }
};

// graphql
exports.graphql = {
  router: '/graphql',
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
  // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
  graphiql: true,
  // graphQL 路由前的拦截器
  onPreGraphQL: function* (ctx) {},
  // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
  onPreGraphiQL: function* (ctx) {},
};