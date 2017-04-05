var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: __dirname + '/client/src/index.js',
  output: {
    path: __dirname + '/client/dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'client/dist'),
    hot: true,
    inline: false,
    compress:false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    watchContentBase: true,   
    port: '8080'
  },
  module: {
    loaders: [
      {
        test: /.js$/,      
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
           presets: ['react']
        }
      }
    ]
  },
}