var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    login: './src/app/login.js',
    app: './src/app/app.js'
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
    ], path.join(__dirname, 'src'))
  ]
  
}