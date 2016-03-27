module.exports = {
  context: __dirname,
  entry: __dirname + '/react-router/main.jsx',
  output: {
    path: __dirname + '/react-router/build',
    filename: "bundle.js"
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