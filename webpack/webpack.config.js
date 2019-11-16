const path = require('path');

module.exports = {
  mode: "development",
  context: __dirname,
  entry: {
    app: ['./src/app.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['to-string-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'cheap-eval-source-map', // source-map cheap-eval-source-map
};