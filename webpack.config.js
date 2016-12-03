'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './ts/index.tsx',
  
  output: {
    path: path.resolve(__dirname + '/build'),
    filename: 'bundle.js'
  },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' },

      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: 'ts-loader' },

      { test: /\.pug$/, loaders: ['file?name=[name].html', 'pug-html?exports=false'] }
    ],

    preLoaders: [
    ]
  },

  externals: {
  },

  plugins: [
  ]
}