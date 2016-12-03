'use strict'

const gulp = require('gulp')
const gutil = require("gulp-util")
const pug = require('gulp-pug')
const webpack = require('webpack')
const WebpackDevServer = require("webpack-dev-server")

let webpackConfig = require("./webpack.config.js")

gulp.task('default', ['build'])

gulp.task('build', ['pug', 'webpack:build'])

gulp.task('build-dev', ['pug', 'webpack:build-dev'])

gulp.task('w', ['webpack-dev-server', 'watch'])
gulp.task('watch', ['pug'], () => {
  gulp.watch(['pug/**/*.pug'], ['pug'])
})

gulp.task('pug', () => {
  return gulp.src('pug/**/*.pug')
  .pipe(pug({
    // Your options in here. 
  }))
  .pipe(gulp.dest('build/dev'))
})

gulp.task('webpack:build', callback => {
  // modify some webpack config options for production
  let myConfig = Object.create(webpackConfig)
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  )

  // run webpack
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err)
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }))
    callback()
  })
})

{
  // modify some webpack config options
  let myDevConfig = Object.create(webpackConfig)
  myDevConfig.devtool = "sourcemap"
  myDevConfig.debug = true

  // create a single instance of the compiler to allow caching
  let devCompiler = webpack(myDevConfig)

  gulp.task("webpack:build-dev", function(callback) {
    // run webpack
    devCompiler.run(function(err, stats) {
      if(err) throw new gutil.PluginError("webpack:build-dev", err)
      gutil.log("[webpack:build-dev]", stats.toString({ colors: true }))
      callback()
    })
  })

  gulp.task("webpack-dev-server", function(callback) {
    // modify some webpack config options
    let myConfig = Object.create(webpackConfig)
    myConfig.devtool = "eval"
    myConfig.debug = true

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
      contentBase: "build/",
      stats: {
        colors: true
      }
    }).listen(8080, "localhost", function(err) {
      if(err) throw new gutil.PluginError("webpack-dev-server", err)
      gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/")
    })
  })
}