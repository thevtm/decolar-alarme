'use strict'

const path = require('path')
const webpack = require('webpack')
let wpConfig = require('./webpack.config')

/* PROD CONFIG */

wpConfig.output.path = path.resolve(wpConfig.output.path + "/prod")

wpConfig.devServer = {
  contentBase: "build/prod/",
  stats: {
    colors: true
  }
}

module.exports = wpConfig