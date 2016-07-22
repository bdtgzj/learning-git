var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    test_redux: './test_redux.js',
    index: './todo/index.js',
    async: './async/index.js',
    reddit: './reddit/index.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [
    new TransferWebpackPlugin([
      { from: 'www'}
    ], path.join(__dirname))
  ]

}