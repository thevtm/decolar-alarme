'use strict'

const path = require('path')
const webpack = require('webpack')
let wpConfig = require('./webpack.config')

/* DEV CONFIG */

wpConfig.output.path = path.resolve(wpConfig.output.path + "/dev")

// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
wpConfig.module.preLoaders.push(
  { test: /\.js$/, loader: "source-map-loader" })

// Add "pretty" to pug-loader 
wpConfig.module.loaders[2].loaders[1] = wpConfig.module.loaders[2].loaders[1].concat("&pretty")

wpConfig.devServer = {
  contentBase: "build/dev/",
  inline: false,
  hot: true,
  stats: {
    colors: true
  }
}

module.exports = wpConfig