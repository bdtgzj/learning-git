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