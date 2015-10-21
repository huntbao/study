'use strict'

var del = require('del')
var path = require('path')

var gulp = require("gulp");
var uglify = require("gulp-uglify")
var gulpif = require("gulp-if")
var minifyCss = require('gulp-minify-css')
var zip = require('gulp-zip')
var git = require('gulp-git')

var glyJsMerge = require('./gulp-gly-jsmerge')
var glyCssMerge = require('./gulp-gly-cssmerge')

var startTime = Date.now()

gulp.task('clean-static', function (cb) {
    console.log("Deleting 'static'... ")
    del(['static'], cb)
})

gulp.task('clean-dist', function (cb) {
    console.log("Deleting 'dist'... ")
    del(['dist'], cb)
})

gulp.task('style', ['clean-dist'], function (cb) {
    var gulpJSFilter = function (file) {
        if (file.path.match(/\.merge\.js/)) {
            return true
        }
    }
    var gulpCSSFilter = function (file) {
        if (file.path.match(/\.merge\.css/)) {
            return true
        }
    }
    var stream =  gulp.src('static/src/main/webapp/**/*.*')
        .pipe(glyJsMerge())
        .pipe(gulpif(gulpJSFilter, uglify({compress: false})))
        .pipe(glyCssMerge())
        .pipe(gulpif(gulpCSSFilter, minifyCss()))
        .pipe(gulp.dest('dist'))
    stream.on('end', function () {
        console.log('Build complete, takes: ' + (Date.now() - startTime))
        startTime = Date.now()
        console.log('Start deploying....')
        gulp.start('deploy')
    })
    return stream
})

gulp.task('release', ['clean-static'], function () {
    var repoUrl = 'ssh://git@172.16.233.59:7999/STAT/static.git'
    console.log('Cloning repo from: ' + repoUrl)
    git.clone(repoUrl, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('Repo is cloned , takes: ' + (Date.now() - startTime))
            gulp.start('style')
        }
        //git.checkout('release/3.7.0-market', {cwd: 'static'}, function (err) {
        //    if (err) throw err
        //})
    })
})

gulp.task('deploy', function () {
    var stream = gulp.src('dist/**/*.*')
        .pipe(zip('static.zip'))
        .pipe(gulp.dest('.'))
    stream.on('end', function () {
        console.log('Zip file is zipped , takes: ' + (Date.now() - startTime))
    })
    return stream
})

gulp.start('release')