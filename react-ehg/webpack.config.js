var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    login: ['babel-polyfill', './src/app/admin/index.js'],
    app: ['babel-polyfill', './src/app/app.js']
  },
  output: {
    path: path.join(__dirname, 'build/js'),
    publicPath: '/js',
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
      { from: 'www', to: '../'}
    ], path.join(__dirname, 'src'))
  ],
  debug: true,
  devtool: 'source-map'
}