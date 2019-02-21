var path = require('path');
var TransferWebpackPlugin = require('transfer-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  mode: 'production', // development
  context: __dirname,
  entry: {
    //login: ['babel-polyfill', './src/app/login/index.js'],
    app: ['./src/app/graphiql-hello.js']
  },
  output: {
    path: path.join(__dirname, 'build/js'),
    publicPath: '/js',
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react']
        }
      }
    ]
  },
  plugins: [
    new TransferWebpackPlugin([
      { from: 'www', to: '../'}
    ], path.join(__dirname, 'src')),
    new webpack.ContextReplacementPlugin(
      /graphql-language-service-interface[\\/]dist$/,
      new RegExp(`^\\./.*\\.js$`)
    )
  ],
  // debug: true,
  devtool: 'source-map'
}
