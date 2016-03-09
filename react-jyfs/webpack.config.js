module.exports = {
  context: __dirname,
  entry: __dirname + '/App/main.jsx',
  output: {
    path: __dirname + '/build',
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
  
}