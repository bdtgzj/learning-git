const path = require('path');
const webpack = require('webpack');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

module.exports = {
  mode: "development",
  context: __dirname,
  entry: {
    app: ['./src/app/app.js']
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
          presets: ["@babel/env", '@babel/react'],
          plugins: ["@babel/plugin-transform-runtime"]
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
    ]
  },
  plugins: [
    new TransferWebpackPlugin([ // from: relative to context/basePath path. to: relative to build path.
      { from: 'www', to: '../'} // from: hook/src. to: hook/build/js
    ], path.join(__dirname, 'src'))
  ],
  devtool: 'source-map', // generate .map file
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true // this prevents the default browser full page refresh on form submission and link change
  }
}